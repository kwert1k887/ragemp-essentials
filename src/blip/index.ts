/** Тип для координат */
import { Coordinate } from 'types/Coordinate';

/** Опции для создания "Blip" (метки на карте) */
export interface BlipOptions {
    name?: string;          // Имя метки
    scale?: number;         // Масштаб
    color?: number;         // Цвет
    alpha?: number;         // Прозрачность
    drawDistance?: number;  // Расстояние видимости
    shortRange?: boolean;   // Малая дальность
    rotation?: number;      // Угол поворота
    radius?: number;        // Радиус
}

/** Класс для работы с метками (Blip) на карте */
export class Blip {
    /** Статическая функция для создания метки (или нескольких меток) */
    static create(sprite: number, pos: Coordinate, options?: BlipOptions): BlipMp;
    static create(sprite: number, pos: Coordinate[], options?: BlipOptions): BlipMp[];

    /** Основная функция для создания метки или нескольких меток */
    static create(spriteOrData: number, posOrOptions?: any, maybeOptions?: any): any {
        try {
            const sprite: number = spriteOrData;
            if (Array.isArray(posOrOptions)) {
                const coords: Coordinate[] = posOrOptions;
                const options: BlipOptions = maybeOptions || {};
                return coords.map(coord => Blip.createSingle(sprite, coord, options));  // Создаем несколько меток
            } else {
                const coord: Coordinate = posOrOptions;
                const options: BlipOptions = maybeOptions || {};
                return Blip.createSingle(sprite, coord, options);  // Создаем одну метку
            }
        } catch (e) {
            console.log(e); // Логируем ошибку
        }
    }

    /** Функция для создания одной метки */
    private static createSingle(sprite: number, coord: Coordinate, options: BlipOptions): BlipMp {
        const { x, y, z, dimension = 0 } = coord;  // Извлекаем координаты и значение dimension

        return mp.blips.new(sprite, new mp.Vector3(x, y, z), {  // Создаем метку на карте с указанными опциями
            name: options.name || "",
            scale: options.scale ?? 1,
            color: options.color ?? 0,
            alpha: options.alpha ?? 255,
            drawDistance: options.drawDistance ?? 100,
            shortRange: options.shortRange ?? false,
            rotation: options.rotation ?? 0,
            dimension: dimension
        });
    }
}