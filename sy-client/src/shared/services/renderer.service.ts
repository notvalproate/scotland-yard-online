import { inject, Injectable } from '@angular/core';
import { Vector2 } from '../interfaces/vector2.interface';
import { CameraService } from './camera.service';
import { Texture } from '../interfaces/texture.interface';

@Injectable({
    providedIn: 'root',
})
export class RendererService {
    private cameraService: CameraService = inject(CameraService);

    private ctx: CanvasRenderingContext2D | null = null;
    private canvas: HTMLCanvasElement | null = null;

    initializeRenderingContext(context: CanvasRenderingContext2D | null, canvas: HTMLCanvasElement): void {
        this.ctx = context;
        this.canvas = canvas;
        this.updateCanvasDimensions();
    }

    updateCanvasDimensions(): void {
        if (!this.canvas) {
            return;
        }

        this.canvas.width = this.cameraService.getViewport().x;
        this.canvas.height = this.cameraService.getViewport().y;
    }

    clearCanvas(): void {
        this.ctx?.clearRect(0, 0, this.cameraService.getViewport().x, this.cameraService.getViewport().y);
    }

    drawTexture(tex: Texture, position: Vector2, dimensions: Vector2): void {
        if (!tex.loaded) {
            tex.onLoad = () => this.drawTexture(tex, position, dimensions);
            return;
        }

        const offsetPos = {
            x: position.x - dimensions.x / 2,
            y: position.y + dimensions.y / 2,
        };
        const newPos = this.cameraService.worldToScreenPoint(offsetPos);

        const newDim = {
            x: dimensions.x * this.cameraService.getScale(),
            y: dimensions.y * this.cameraService.getScale(),
        };

        this.ctx?.drawImage(tex.image, newPos.x, newPos.y, newDim.x, newDim.y);
    }

    drawRect(position: Vector2, dimensions: Vector2): void {
        const offsetPos = {
            x: position.x - dimensions.x / 2,
            y: position.y + dimensions.y / 2,
        };
        const newPos = this.cameraService.worldToScreenPoint(offsetPos);

        const newDim = {
            x: dimensions.x * this.cameraService.getScale(),
            y: dimensions.y * this.cameraService.getScale(),
        };

        this.ctx?.beginPath();
        this.ctx?.rect(newPos.x, newPos.y, newDim.x, newDim.y);
        this.ctx?.stroke();
    }
}
