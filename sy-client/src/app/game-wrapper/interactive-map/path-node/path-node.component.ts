import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, OnInit, ElementRef, NgModule } from '@angular/core';

@Component({
    selector: 'app-path-node',
    imports: [CommonModule],
    templateUrl: './path-node.component.html',
    styleUrl: './path-node.component.scss',
})
export class PathNodeComponent implements OnInit{
    @ViewChild('nodeContainer') pathNodeRef!: ElementRef;
    @Input() mapScale: any;
    @Input() node: any;
    taxi:boolean = false;
    bus:boolean = false;
    underground:boolean = false;
    ferry:boolean = false;

    ngOnInit(): void {
        for (let i = 0; i < this.node.moves.length; i++) {
            if (this.node.moves[i].transport == 'taxi') {
                this.taxi = true;
            } else if (this.node.moves[i].transport == 'bus') {
                this.bus = true;
            } else if (this.node.moves[i].transport == 'underground') {
                this.underground = true;
            } else if (this.node.moves[i].transport == 'ferry') {
                this.ferry = true;
            }
        }
        // console.log('taxi', this.taxi, 'bus', this.bus, 'underground', this.underground, 'ferry', this.ferry);
    }

    ngOnChanges() {
        if (this.mapScale * 514 > window.screen.width + 200 && this.mapScale < 6 && this.pathNodeRef) {
            console.log('mapScale', this.mapScale);
            this.pathNodeRef.nativeElement.style.left = (this.node.coordinates.x * this.mapScale/5) + 'px';
            this.pathNodeRef.nativeElement.style.top = (this.node.coordinates.y * this.mapScale/5) + 'px';
            this.pathNodeRef.nativeElement.style.width = (42 * this.mapScale/5) + 'px';
            this.pathNodeRef.nativeElement.style.height = (42 * this.mapScale/5) + 'px';
        }
    }
    
}
