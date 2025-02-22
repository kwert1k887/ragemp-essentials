export interface EventOptions {
    /**
     * Логировать вызов события
     */
    log?: boolean;
}

export class Event {
    /**
     * Регистрирует один или несколько обработчиков для событий.
     * Можно передать либо пару (имя события и обработчик), либо объект, где ключи – имена событий, а значения – обработчики.
     * @param eventNameOrObj - Название события или объект с событиями
     * @param handler - Функция-обработчик (если передаётся название события)
     */
    static on(eventNameOrObj: string | { [key: string]: (...args: any[]) => void }, handler?: (...args: any[]) => void): void {
        if (typeof eventNameOrObj === 'string' && handler) {
            console.log(`[Event.on] Зарегистрировано событие: ${eventNameOrObj}`);

            mp.events.add(eventNameOrObj, (player: PlayerMp | undefined, ...args: any[]) => {
                if (typeof player === 'object' && 'name' in player) {
                    handler(player, ...args);
                } else {
                    handler(...args);
                }
            });
            return;
        }

        if (typeof eventNameOrObj === 'object' && !Array.isArray(eventNameOrObj)) {
            const eventNames = Object.keys(eventNameOrObj);
            if (eventNames.length <= 1) {
                throw new Error("Если передан объект, он должен содержать более одного события.");
            }

            eventNames.forEach((eventName) => {
                console.log(`[Event.on] Зарегистрировано событие: ${eventName}`);

                mp.events.add(eventName, (player: PlayerMp | undefined, ...args: any[]) => {
                    const handler = eventNameOrObj[eventName];
                    if (typeof player === 'object' && 'name' in player) {
                        handler(player, ...args);
                    } else {
                        handler(...args);
                    }
                });
            });
            return;
        }

        throw new Error("Неверный формат данных. Либо передайте строку с обработчиком, либо объект с несколькими событиями.");
    }

    /**
     * Удаляет обработчик события.
     * @param eventName - Название события
     * @param handler - Функция-обработчик, которая должна быть удалена
     */
    static off(eventName: string, handler: (...args: any[]) => void): void {
        mp.events.remove(eventName, handler);
    }

    /**
     * Вызывает событие с указанными аргументами.
     * В клиентском окружении, если событие начинается с "server:", вызывается удалённое серверное событие,
     * а в серверном окружении, если событие начинается с "client:", можно реализовать вызов клиентского события.
     * @param eventName - Название события
     * @param args - Массив аргументов для обработчиков события
     * @param options - Дополнительные опции вызова события
     */
    static emit(eventName: string, args: any[] = [], options: EventOptions = {}): void {
        if (options.log === true) {
            if (typeof mp !== 'undefined' && mp.events) {
                if (mp && mp.console) {
                    mp.console.logInfo(`[Event.emit] Вызов события "${eventName}" с аргументами: ${args}`);
                } else {
                    console.log(`[Event.emit] Вызов события "${eventName}" с аргументами: ${args}`);
                }
            } else {
                console.log(`[Event.emit] Не удалось логировать событие, окружение не определено`);
            }
        }

        if (typeof mp !== 'undefined' && mp.events) {
            if (typeof mp.events.callRemote === 'function') {
                mp.events.callRemote(eventName, ...args);
            } else if (typeof mp.events.call === 'function') {
                mp.events.call(eventName, ...args);
            } else {
                mp.console.logError(`[Event.emit] Не удалось вызвать событие "${eventName}": mp.events.call или callRemote не определены`);
            }
        } else {
            mp.console.logError(`[Event.emit] Не удалось вызвать событие "${eventName}": mp не определён`);
        }
    }
}