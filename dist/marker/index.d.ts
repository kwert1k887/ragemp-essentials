/**
 * Опции для создания Marker (маркера)
 */
export interface MarkerOptions {
    direction?: Vector3;
    rotation?: Vector3;
    color?: [number, number, number, number];
    visible?: boolean;
    dimension?: number;
}
/**
 * Класс для управления маркерами на карте
 */
export declare class Marker {
    /**
     * Создаёт один или несколько маркеров.
     * @param type - Тип маркера
     * @param position - Координаты маркера
     * @param scale - Масштаб маркера
     * @param options - Дополнительные настройки маркера
     * @returns Созданный маркер, массив маркеров или null в случае ошибки
     */
    static create(type: number, position: Vector3 | Vector3[], scale: number, options?: MarkerOptions): MarkerMp | MarkerMp[] | null;
    /**
     * Создаёт один маркер.
     * @param type - Тип маркера
     * @param position - Координаты маркера
     * @param scale - Масштаб маркера
     * @param options - Дополнительные настройки маркера
     * @returns Созданный маркер
     */
    private static createSingle;
}
