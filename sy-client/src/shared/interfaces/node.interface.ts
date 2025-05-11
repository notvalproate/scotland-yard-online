import { Edge } from './edge.interface';
import { Vector2 } from './vector2.interface';

export interface Node {
    id: number;
    coordinates: Vector2;
    edges: Edge[];
}
