/**
 * Интерфейс, описывающий координаты для создания блипа.
 * Если dimension не указан, будет использовано значение по умолчанию (0).
 */
export interface Coordinate {
    x: number;
    y: number;
    z: number;
    dimension?: number;
}
/**
 * Опциональные параметры для создания блипа.
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
}
/**
 * Класс Index содержит методы для создания одного или нескольких блипов.
 */
export declare class Blip {
    /**
     * Перегрузка для создания одного блипа.
     * @param sprite - идентификатор спрайта блипа.
     * @param pos - координаты для блипа.
     * @param options - дополнительные параметры.
     * @returns Созданный объект блипа.
     */
    static create(sprite: number, pos: Coordinate, options?: BlipOptions): BlipMp;
    /**
     * Перегрузка для создания нескольких блипов.
     * @param sprite - идентификатор спрайта блипа.
     * @param pos - массив координат для создания блипов.
     * @param options - общие дополнительные параметры для всех блипов.
     * @returns Массив созданных объектов блипов.
     */
    static create(sprite: number, pos: Coordinate[], options?: BlipOptions): BlipMp[];
    /**
     * Приватный метод, создающий один блип с учетом переданных координат и опций.
     * @param sprite - идентификатор спрайта.
     * @param coord - координаты создания блипа.
     * @param options - дополнительные параметры.
     * @returns Объект блипа, созданный через API RAGE:MP.
     */
    private static createSingle;
}
