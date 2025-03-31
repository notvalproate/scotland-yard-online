export interface Node{
    node_number: number;
    coordinates: {
        x: number;
        y: number;
    };
    moves: {
        to: number;
        transport: 'taxi' | 'bus' | 'underground' | 'ferry';
    }[];
}