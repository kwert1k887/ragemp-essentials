/**
 * Опции для создания колшейп (colshape)
 */
export interface ColshapeOptions {
    key?: string;
    onEnter?: (player: PlayerMp, colshape: ColshapeMp) => void;
    onExit?: (player: PlayerMp, colshape: ColshapeMp) => void;
    marker?: boolean | {
        type?: number;
        color?: [number, number, number, number];
    };
}
/**
 * Класс для управления колшейп
 */
export declare class Colshape {
    /**
     * Создаёт колшейп.
     * @param position - Координаты центра коллизии
     * @param radius - Радиус коллизии
     * @param options - Дополнительные настройки коллизии
     * @returns Созданная коллизия
     */
    static create(position: Vector3 | Vector3[], radius: number, options?: ColshapeOptions): ColshapeMp | ColshapeMp[] | undefined;
    /**
     * Создаёт один колшейп.
     * @param position - Координаты центра коллизии
     * @param radius - Радиус коллизии
     * @param options - Дополнительные настройки коллизии
     * @returns Созданная коллизия
     */
    private static createSingle;
}
