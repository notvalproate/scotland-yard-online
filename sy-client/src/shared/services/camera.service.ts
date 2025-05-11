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
    }

    worldToScreenPoint(point: Vector2): Vector2 {
        // have to move acc to screen width and height
        return {
            x: (point.x - this.position.x) * this.scale,
            y: (point.y - this.position.y) * this.scale,
        };
    }

    screenToWorldPoint(point: Vector2): Vector2 {
        // have to move acc to screen width and height
        return {
            x: point.x / this.scale + this.position.x,
            y: point.y / this.scale + this.position.y,
        };
    }

    onResize(): void {
        this.viewport = {
            x: window.innerWidth,
            y: window.innerHeight,
        };
        console.log(this.viewport);
    }
}
