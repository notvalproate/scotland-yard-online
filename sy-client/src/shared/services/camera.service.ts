import { Injectable } from '@angular/core';
import { Vector2 } from '../interfaces/vector2.interface';

@Injectable({
    providedIn: 'root',
})
export class CameraService {
    private viewport: Vector2 = { x: 0, y: 0 };
    private position: Vector2 = { x: 0, y: 0 };
    private scale: number = 1;

    constructor() {
        this.onResize();
        // this.position.x = this.viewport.x / 2;
        // this.position.y = this.viewport.y / 2;
    }

    getViewport(): Vector2 {
        return this.viewport;
    }

    getPosition(): Vector2 {
        return this.position;
    }

    setPosition(point: Vector2): void {
        this.position = point;
    }

    getScale(): number {
        return this.scale;
    }

    setScale(value: number): void {
        if (value <= 0) {
            return;
        }
        this.scale = value;
    }

    worldToScreenPoint(point: Vector2): Vector2 {
        return {
            x: this.viewport.x / 2 + (point.x - this.position.x) * this.scale,
            y: this.viewport.y / 2 - (point.y - this.position.y) * this.scale,
        };
    }

    screenToWorldPoint(point: Vector2): Vector2 {
        return {
            x: this.position.x + (point.x - this.viewport.x / 2) / this.scale,
            y: this.position.y + (this.viewport.y / 2 - point.y) / this.scale,
        };
    }

    onResize(): void {
        this.viewport = {
            x: window.innerWidth,
            y: window.innerHeight,
        };
    }
}
