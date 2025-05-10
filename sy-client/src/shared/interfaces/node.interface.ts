import { Edge } from './edge.interface';

export interface Node {
    id: number;
    coordinates: {
        x: number;
        y: number;
    };
    edges: Edge[];
}
