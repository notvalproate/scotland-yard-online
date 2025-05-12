import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TransportMethod } from '../../../../shared/enumeration/transportation-method.enum';
import { Node } from '../../../../shared/interfaces/node.interface';

@Component({
    selector: 'app-path-node',
    imports: [CommonModule],
    templateUrl: './path-node.component.html',
    styleUrl: './path-node.component.scss',
})
export class PathNodeComponent implements OnInit {
    @ViewChild('nodeContainer') pathNodeRef!: ElementRef;
    @Input() mapScale: any;
    @Input({ required: true }) node!: Node;
    taxi: boolean = false;
    bus: boolean = false;
    underground: boolean = false;
    ferry: boolean = false;

    ngOnInit(): void {
        for (let i = 0; i < this.node.edges.length; i++) {
            switch (this.node.edges[i].transportMethod) {
                case TransportMethod.Taxi: {
                    this.taxi = true;
                    break;
                }
                case TransportMethod.Bus: {
                    this.bus = true;
                    break;
                }
                case TransportMethod.Underground: {
                    this.underground = true;
                    break;
                }
                case TransportMethod.Ferry: {
                    this.ferry = true;
                    break;
                }
            }
        }
    }

    ngOnChanges() {
        if (this.mapScale * 514 > window.screen.width + 200 && this.mapScale < 6 && this.pathNodeRef) {
            console.log('mapScale', this.mapScale);
            this.pathNodeRef.nativeElement.style.left = (this.node.coordinates.x * this.mapScale) / 5 + 'px';
            this.pathNodeRef.nativeElement.style.top = (this.node.coordinates.y * this.mapScale) / 5 + 'px';
            this.pathNodeRef.nativeElement.style.width = (42 * this.mapScale) / 5 + 'px';
            this.pathNodeRef.nativeElement.style.height = (42 * this.mapScale) / 5 + 'px';
        }
    }
}
