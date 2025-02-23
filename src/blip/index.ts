/**
 * Опции для создания Blip (метки на карте)
 */
export interface BlipOptions {
    name?: string;
    scale?: number;
    color?: number;
    alpha?: number;
    drawDistance?: number;
    shortRange?: boolean;
    rotation?: number;
    radius?: number;
    dimension?: number;
    animation?: {
        type: 'blink';
        blinkDuration: number;
    };
}

/**
 * Класс для управления метками (Blip) на карте
 */
export class Blip {
    /**
     * Создаёт одну или несколько меток.
     * @param sprite - Идентификатор спрайта метки
     * @param position - Координаты метки или массив координат
     * @param options - Дополнительные настройки метки
     * @returns Созданную метку, массив меток или null в случае ошибки
     */
    static create(sprite: number, position: Vector3 | Vector3[], options?: BlipOptions): BlipMp | BlipMp[] | null {
        try {
            if (Array.isArray(position)) {
                return position.map(coord => Blip.createSingle(sprite, coord, options));
            }
            return Blip.createSingle(sprite, position, options);
        } catch (error) {
            console.error("[Blip.create] Ошибка при создании метки:", error);
            return null;
        }
    }

    /**
     * Создаёт одну метку.
     * @param sprite - Идентификатор спрайта метки
     * @param coord - Координаты метки
     * @param options - Настройки метки
     * @returns Созданная метка
     */
    private static createSingle(sprite: number, coord: Vector3, options: BlipOptions = {}): BlipMp {
        const blip = mp.blips.new(sprite, new mp.Vector3(coord.x, coord.y, coord.z), {
            name: options.name ?? "",
            scale: options.scale ?? 1,
            color: options.color ?? 0,
            alpha: options.alpha ?? 255,
            drawDistance: options.drawDistance ?? 100,
            shortRange: options.shortRange ?? false,
            rotation: options.rotation ?? 0,
            dimension: options.dimension ?? 0
        });

        if (options.animation) {
            Blip.applyAnimation(blip, options.animation);
        }

        return blip;
    }

    /**
     * Применяет анимацию к метке.
     * @param blip - Метка
     * @param animation - Параметры анимации
     */
    private static applyAnimation(blip: BlipMp, animation: { type: string, blinkDuration: number }) {
        if (animation.type === 'blink') {
            Blip.blinkAnimation(blip, animation.blinkDuration);
        }
    }

    /**
     * Анимация мерцания для метки.
     * @param blip - Метка
     * @param blinkDuration - Длительность мерцания в миллисекундах
     */
    private static blinkAnimation(blip: BlipMp, blinkDuration: number) {
        let startTime = Date.now();

        setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const progress = (elapsedTime % blinkDuration) / blinkDuration;
            const alpha = 255 * (0.5 + 0.5 * Math.sin(progress * Math.PI * 2));
            const alphaValue = Math.floor(Math.max(50, Math.min(alpha, 255)));


            if (typeof mp !== "undefined" && typeof mp.game !== "undefined" && blip.handle) {
                mp.game.ui.setBlipAlpha(blip.handle, alphaValue);
            } else {
                blip.alpha = alphaValue;
            }

            if (elapsedTime >= blinkDuration) {
                startTime = Date.now();
            }
        }, 16);
    }
}