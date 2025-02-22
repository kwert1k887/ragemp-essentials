export interface EventOptions {
    /**
     * Логировать вызов события
     */
    log?: boolean;
}
export declare class Event {
    /**
     * Регистрирует один или несколько обработчиков для событий.
     * Можно передать либо пару (имя события и обработчик), либо объект, где ключи – имена событий, а значения – обработчики.
     * @param eventNameOrObj - Название события или объект с событиями
     * @param handler - Функция-обработчик (если передаётся название события)
     */
    static on(eventNameOrObj: string | {
        [key: string]: (...args: any[]) => void;
    }, handler?: (...args: any[]) => void): void;
    /**
     * Удаляет обработчик события.
     * @param eventName - Название события
     * @param handler - Функция-обработчик, которая должна быть удалена
     */
    static off(eventName: string, handler: (...args: any[]) => void): void;
    /**
     * Вызывает событие с указанными аргументами.
     * В клиентском окружении, если событие начинается с "server:", вызывается удалённое серверное событие,
     * а в серверном окружении, если событие начинается с "client:", можно реализовать вызов клиентского события.
     * @param eventName - Название события
     * @param args - Массив аргументов для обработчиков события
     * @param options - Дополнительные опции вызова события
     */
    static emit(eventName: string, args?: any[], options?: EventOptions): void;
}
