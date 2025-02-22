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
export class Marker {
    /**
     * Создаёт один или несколько маркеров.
     * @param type - Тип маркера
     * @param position - Координаты маркера
     * @param scale - Масштаб маркера
     * @param options - Дополнительные настройки маркера
     * @returns Созданный маркер, массив маркеров или null в случае ошибки
     */
    static create(type: number, position: Vector3 | Vector3[], scale: number, options?: MarkerOptions): MarkerMp | MarkerMp[] | null {
        try {
            if (Array.isArray(position)) {
                return position.map(coord => Marker.createSingle(type, coord, scale, options));
            }
            return Marker.createSingle(type, position, scale, options);
        } catch (error) {
            console.error("[Marker.create] Ошибка при создании маркера:", error);
            return null;
        }
    }

    /**
     * Создаёт один маркер.
     * @param type - Тип маркера
     * @param position - Координаты маркера
     * @param scale - Масштаб маркера
     * @param options - Дополнительные настройки маркера
     * @returns Созданный маркер
     */
    private static createSingle(type: number, position: Vector3, scale: number, options: MarkerOptions = {}): MarkerMp {
        return mp.markers.new(type, position, scale, {
            direction: options.direction ?? new mp.Vector3(0, 0, 0),
            rotation: options.rotation ?? new mp.Vector3(0, 0, 0),
            color: options.color ?? [255, 255, 255, 255],
            visible: options.visible ?? true,
            dimension: options.dimension ?? 0
        });
    }
}