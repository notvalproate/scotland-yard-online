import { Injectable } from '@angular/core';
import { nodes as nodeData } from '../data/nodes';
import { edges as edgeData } from '../data/edges';
import { Node } from '../interfaces/node.interface';
import { Edge } from '../interfaces/edge.interface';

@Injectable({
    providedIn: 'root',
})
export class MapDataService {
    private nodes: Node[] = nodeData;
    private edges: Edge[] = edgeData;

    constructor() {
        this.populateNodesWithEdges();
    }

    public getNode(id: number): Node {
        if (id <= 0 || id > this.nodes.length) {
            throw RangeError(`Node ID: ${id} is out of bounds`);
        }
        return this.nodes[id - 1];
    }

    private populateNodesWithEdges(): void {
        for(const edge of this.edges) {
            this.getNode(edge.first).edges.push(edge);
            this.getNode(edge.second).edges.push(edge);
        }
    }
}
