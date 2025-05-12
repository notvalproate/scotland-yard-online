import { AfterViewInit, Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { CameraService } from '../../shared/services/camera.service';
import { MapDataService } from '../../shared/services/map-data.service';
import { RendererService } from '../../shared/services/renderer.service';
import { Vector2 } from '../../shared/interfaces/vector2.interface';

@Component({
    selector: 'app-game-canvas',
    imports: [],
    templateUrl: './game-canvas.component.html',
    styleUrl: './game-canvas.component.scss',
})
export class GameCanvasComponent implements AfterViewInit {
    private mapDataService: MapDataService = inject(MapDataService);
    private camera: CameraService = inject(CameraService);
    private renderer: RendererService = inject(RendererService);

    @ViewChild('gameCanvas', { static: false }) private gameCanvas!: ElementRef<HTMLCanvasElement>;
    private ctx: CanvasRenderingContext2D | null = null;

    isHolding = false;
    private lastMousePosition: Vector2 = { x: 0, y: 0 };
    private readonly scrollScaleDelta = 0.1;

    ngAfterViewInit(): void {
        this.renderer.initializeRenderingContext(
            this.gameCanvas.nativeElement.getContext('2d'),
            this.gameCanvas.nativeElement,
        );
        this.updateRenderer();

        // const img = new Image();
        // img.src = 'images/map.webp';

        // img.onload = () => {
        //     ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        // };
    }

    @HostListener('window:resize', ['$event'])
    onResize(event?: any): void {
        this.camera.onResize();
        this.renderer.updateCanvasDimensions();
        this.updateRenderer();
    }

    // No loop needed, can manually call on data update since the game doesnt require constant re-rendering
    private updateRenderer(): void {
        this.renderer.clearCanvas();
        this.renderer.drawRect({ x: 0, y: 0 }, { x: 100, y: 100 });
    }

    onMouseDown(event: MouseEvent): void {
        this.isHolding = true;
        this.lastMousePosition = { x: event.clientX, y: event.clientY };
    }

    onMouseMove(event: MouseEvent): void {
        if (!this.isHolding) {
            return;
        }

        const newMousePosition = { x: event.clientX, y: event.clientY };
        const translation = {
            x: (this.lastMousePosition.x - newMousePosition.x) / this.camera.getScale(),
            y: (newMousePosition.y - this.lastMousePosition.y) / this.camera.getScale()
        };
        this.camera.translate(translation);
        this.lastMousePosition = newMousePosition;

        this.updateRenderer();
    }

    onMouseUp(): void {
        this.isHolding = false;
    }

    onMouseWheel(event: WheelEvent): void {
        const newScale = this.camera.getScale() - (Math.sign(event.deltaY) * this.scrollScaleDelta)

        if (newScale > 3 || newScale <= 0.1) {
            return;
        }

        const mousePos = {
            x: event.clientX,
            y: event.clientY
        }

        const previousMouseWorldPoint = this.camera.screenToWorldPoint(mousePos)

        this.camera.setScale(newScale);

        const newMouseWorldPoint = this.camera.screenToWorldPoint(mousePos)
        const translation = {
            x: (previousMouseWorldPoint.x - newMouseWorldPoint.x),
            y: (previousMouseWorldPoint.y - newMouseWorldPoint.y)
        };

        this.camera.translate(translation);

        this.updateRenderer();
    }
}
