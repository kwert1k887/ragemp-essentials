/** Тип для координат */
import { Coordinate } from 'types/Coordinate';
/** Опции для создания "Blip" (метки на карте) */
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
/** Класс для работы с метками (Blip) на карте */
export declare class Blip {
    /** Статическая функция для создания метки (или нескольких меток) */
    static create(sprite: number, pos: Coordinate, options?: BlipOptions): BlipMp;
    static create(sprite: number, pos: Coordinate[], options?: BlipOptions): BlipMp[];
    /** Функция для создания одной метки */
    private static createSingle;
}
