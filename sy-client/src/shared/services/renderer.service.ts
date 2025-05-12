import { ElementRef, inject, Injectable } from '@angular/core';
import { CameraService } from './camera.service';
import { Vector2 } from '../interfaces/vector2.interface';

@Injectable({
    providedIn: 'root',
})
export class RendererService {
    private cameraService: CameraService = inject(CameraService);

    private ctx: CanvasRenderingContext2D | null = null;

    initializeRenderer(context: CanvasRenderingContext2D | null, canvas: HTMLCanvasElement): void {
        this.ctx = context;
        canvas.width = this.cameraService.getViewport().x;
        canvas.height = this.cameraService.getViewport().y;
    }

    drawRect(position: Vector2, dimensions: Vector2): void {
        const offsetPos = {
            x: position.x - dimensions.x / 2,
            y: position.y + dimensions.y / 2
        }
        const newPos = this.cameraService.worldToScreenPoint(offsetPos);

        const newDim = {
            x: dimensions.x * this.cameraService.getScale(),
            y: dimensions.y * this.cameraService.getScale()
        };

        this.ctx?.beginPath();
        this.ctx?.rect(newPos.x, newPos.y, newDim.x, newDim.y);
        this.ctx?.stroke();
    }
}
