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
        return mp.blips.new(sprite, new mp.Vector3(coord.x, coord.y, coord.z), {
            name: options.name ?? "",
            scale: options.scale ?? 1,
            color: options.color ?? 0,
            alpha: options.alpha ?? 255,
            drawDistance: options.drawDistance ?? 100,
            shortRange: options.shortRange ?? false,
            rotation: options.rotation ?? 0,
            dimension: options.dimension ?? 0
        });
    }
}