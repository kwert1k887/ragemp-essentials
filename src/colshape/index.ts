import { Marker } from '../marker';

/**
 * Опции для создания колшейп (colshape)
 */
export interface ColshapeOptions {
    key?: string;
    onEnter?: (player: PlayerMp, colshape: ColshapeMp) => void;
    onExit?: (player: PlayerMp, colshape: ColshapeMp) => void;
    marker?: boolean | { type?: number; color?: [number, number, number, number] };
}

/**
 * Класс для управления колшейп
 */
export class Colshape {
    /**
     * Создаёт колшейп.
     * @param position - Координаты центра коллизии
     * @param radius - Радиус коллизии
     * @param options - Дополнительные настройки коллизии
     * @returns Созданная коллизия
     */
    static create(position: Vector3 | Vector3[], radius: number, options?: ColshapeOptions) {
        try {
            if (Array.isArray(position)) {
                return position.map(coord => Colshape.createSingle(coord, radius, options));
            }
            return Colshape.createSingle(position, radius, options);
        } catch (e) {
            console.error('Ошибка при создании колшейпа:', e);
        }
    }

    /**
     * Создаёт один колшейп.
     * @param position - Координаты центра коллизии
     * @param radius - Радиус коллизии
     * @param options - Дополнительные настройки коллизии
     * @returns Созданная коллизия
     */
    private static createSingle(position: Vector3, radius: number, options?: ColshapeOptions) {
        const colshape = mp.colshapes.newSphere(position.x, position.y, position.z, radius);
        const extendedColshape = colshape as ColshapeMp & { players: Set<PlayerMp> };

        extendedColshape.players = new Set<PlayerMp>();

        mp.events.add('playerEnterColshape', (player: PlayerMp, shape) => {
            if (shape === colshape) {
                extendedColshape.players.add(player);
                options?.onEnter?.(player, colshape);
            }
        });
        mp.events.add('playerExitColshape', (player: PlayerMp, shape) => {
            if (shape === colshape) {
                extendedColshape.players.delete(player);
                options?.onExit?.(player, colshape);
            }
        });

        if (options?.marker) {
            if (Array.isArray(options.marker)) {
                throw new Error('Маркер не может быть массивом. Пожалуйста, передайте объект или булево значение.');
            }

            if (options.marker === true) {
                Marker.create(1, position, 1, { color: [255, 255, 255, 255], visible: true });
            } else if (typeof options.marker === 'object') {
                Marker.create(options.marker.type ?? 1, position, 1, { color: options.marker.color ?? [255, 255, 255, 255], visible: true });
            } else {
                throw new Error('Неверный формат маркера. Ожидалось булево значение или объект.');
            }
        }

        return colshape;
    }
}