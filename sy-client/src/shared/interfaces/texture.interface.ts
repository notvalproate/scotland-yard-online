import { Vector2 } from './vector2.interface';

export interface Texture {
    path: string;
    image: HTMLImageElement;
    dimensions: Vector2;
    loaded: boolean;
    onLoad: CallableFunction | null;
}
