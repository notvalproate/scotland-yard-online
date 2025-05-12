import { Component, ElementRef, inject, ViewChild } from '@angular/core';
// import { nodes } from '../../../shared/interfaces/nodes';
import { nodes } from '../../../shared/data/nodes';
import { Node } from '../../../shared/interfaces/node.interface';
import { MapDataService } from '../../../shared/services/map-data.service';
import { PathNodeComponent } from './path-node/path-node.component';

@Component({
    selector: 'app-interactive-map',
    imports: [PathNodeComponent],
    templateUrl: './interactive-map.component.html',
    styleUrl: './interactive-map.component.scss',
})
export class InteractiveMapComponent {
    private mapDataService: MapDataService = inject(MapDataService);
    @ViewChild('map') mapRef!: ElementRef;

    isDragging: boolean = false;
    mapX: number = 0;
    mapY: number = 0;
    curStartX: number = 0;
    curStartY: number = 0;
    currentX: number = 0;
    currentY: number = 0;
    mapPosX: number = 0;
    mapPosY: number = 0;
    mapScale: number = 5;
    shiftX: number = 0;
    shiftY: number = 0;

    // Define the nodes array with the Node interface
    nodeList: Node[] = nodes;

    onMouseDown(event: MouseEvent) {
        this.isDragging = true;
        this.mapX = this.mapRef.nativeElement.getBoundingClientRect().left;
        this.mapY = this.mapRef.nativeElement.getBoundingClientRect().top;
        this.curStartX = event.clientX;
        this.curStartY = event.clientY;
    }

    onMouseMove(event: MouseEvent) {
        this.currentX = event.clientX;
        this.currentY = event.clientY;
        this.mapPosX = this.mapX + this.currentX - this.curStartX;
        this.mapPosY = this.mapY + this.currentY - this.curStartY;
        if (
            this.isDragging &&
            this.mapPosX < 0 &&
            this.mapPosX > -this.mapRef.nativeElement.offsetWidth + window.innerWidth
        ) {
            this.mapRef.nativeElement.style.left = this.mapPosX + 'px';
        }
        if (
            this.isDragging &&
            this.mapPosY < 0 &&
            this.mapPosY > -this.mapRef.nativeElement.offsetHeight + window.innerHeight
        ) {
            this.mapRef.nativeElement.style.top = this.mapPosY + 'px';
        }
    }

    onMouseUp() {
        this.isDragging = false;
    }

    onZoom(event: WheelEvent) {
        this.shiftX =
            ((event.clientX - this.mapRef.nativeElement.getBoundingClientRect().left) * (-event.deltaY * 0.002)) /
            this.mapScale;
        this.shiftY =
            ((event.clientY - this.mapRef.nativeElement.getBoundingClientRect().top) * (-event.deltaY * 0.002)) /
            this.mapScale;
        console.log(event.deltaY);
        this.mapScale = Math.round((this.mapScale - event.deltaY * 0.002) * 100) / 100;
        if (this.mapScale * 514 > window.screen.width + 200 && this.mapScale < 6) {
            this.mapRef.nativeElement.style.width = this.mapScale * 514 + 'px';
            this.mapRef.nativeElement.style.height = this.mapScale * 385 + 'px';
            this.mapRef.nativeElement.style.left =
                this.mapRef.nativeElement.getBoundingClientRect().left - this.shiftX + 'px';
            this.mapRef.nativeElement.style.top =
                this.mapRef.nativeElement.getBoundingClientRect().top - this.shiftY + 'px';
            if (this.mapRef.nativeElement.getBoundingClientRect().left > 0) {
                this.mapRef.nativeElement.style.left = 0 + 'px';
            }
            if (this.mapRef.nativeElement.getBoundingClientRect().top > 0) {
                this.mapRef.nativeElement.style.top = 0 + 'px';
            }
            if (this.mapRef.nativeElement.getBoundingClientRect().left + this.mapScale * 514 < window.innerWidth) {
                this.mapRef.nativeElement.style.left =
                    -(this.mapRef.nativeElement.getBoundingClientRect().width - window.innerWidth) + 'px';
            }
            if (this.mapRef.nativeElement.getBoundingClientRect().top + this.mapScale * 385 < window.innerHeight) {
                this.mapRef.nativeElement.style.top =
                    -(this.mapRef.nativeElement.getBoundingClientRect().height - window.innerHeight) + 'px';
            }
        } else if (this.mapScale >= 6) {
            this.mapScale = 6;
        } else if (this.mapScale * 514 < window.screen.width + 200) {
            this.mapScale = (window.screen.width + 200) / 514;
        }
        // console.log(this.mapScale, this.mapRef.nativeElement.getBoundingClientRect().width);
    }
}
