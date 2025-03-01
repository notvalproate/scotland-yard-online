import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-interactive-map',
  imports: [],
  templateUrl: './interactive-map.component.html',
  styleUrl: './interactive-map.component.scss'
})
export class InteractiveMapComponent {
  @ViewChild('map') mapRef!: ElementRef;

  isDragging:boolean = false;
  mapX:number = 0;
  mapY:number = 0;
  curStartX:number = 0;
  curStartY:number = 0;
  currentX:number = 0;
  currentY:number = 0;
  mapPosX:number = 0;
  mapPosY:number = 0;


  onMouseDown(event:MouseEvent) {
    this.isDragging = true;
    this.mapX = this.mapRef.nativeElement.getBoundingClientRect().left;
    this.mapY = this.mapRef.nativeElement.getBoundingClientRect().top;
    this.curStartX = event.clientX;
    this.curStartY = event.clientY;
  }

  onMouseMove(event:MouseEvent) {
    this.currentX = event.clientX;
    this.currentY = event.clientY;
    this.mapPosX = this.mapX + this.currentX - this.curStartX ;
    this.mapPosY = this.mapY + this.currentY - this.curStartY ; 
    if (this.isDragging && this.mapPosX < 0 && this.mapPosX > -this.mapRef.nativeElement.offsetWidth + window.innerWidth) {
      this.mapRef.nativeElement.style.left = this.mapPosX + 'px';
    }else{
      this.curStartX = this.currentX;
    }
    if (this.isDragging && this.mapPosY < 0 && this.mapPosY > -this.mapRef.nativeElement.offsetHeight + window.innerHeight) {
      this.mapRef.nativeElement.style.top = this.mapPosY + 'px';
    }else{
      this.curStartY = this.currentY;
    }
  }

  onMouseUp() {
    this.isDragging = false;
  }
}


