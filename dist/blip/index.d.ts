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
export declare class Blip {
    /**
     * Создаёт одну или несколько меток.
     * @param sprite - Идентификатор спрайта метки
     * @param position - Координаты метки или массив координат
     * @param options - Дополнительные настройки метки
     * @returns Созданную метку, массив меток или null в случае ошибки
     */
    static create(sprite: number, position: Vector3 | Vector3[], options?: BlipOptions): BlipMp | BlipMp[] | null;
    /**
     * Создаёт одну метку.
     * @param sprite - Идентификатор спрайта метки
     * @param coord - Координаты метки
     * @param options - Настройки метки
     * @returns Созданная метка
     */
    private static createSingle;
    /**
     * Применяет анимацию к метке.
     * @param blip - Метка
     * @param animation - Параметры анимации
     */
    private static applyAnimation;
    /**
     * Анимация мерцания для метки.
     * @param blip - Метка
     * @param blinkDuration - Длительность мерцания в миллисекундах
     */
    private static blinkAnimation;
}
