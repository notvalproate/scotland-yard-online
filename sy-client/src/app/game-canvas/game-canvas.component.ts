import { AfterViewInit, Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { CameraService } from '../../shared/services/camera.service';
import { MapDataService } from '../../shared/services/map-data.service';
import { RendererService } from '../../shared/services/renderer.service';

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

    ngAfterViewInit(): void {
        this.renderer.initializeRenderer(
            this.gameCanvas.nativeElement.getContext('2d'), 
            this.gameCanvas.nativeElement
        );

        // const img = new Image();
        // img.src = 'images/map.webp';

        // img.onload = () => {
        //     ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        // };
    }

    @HostListener('window:resize', ['$event'])
    onResize(event?: any): void {
        this.camera.onResize();
    }

    // No loop needed, can manually call on data update since the game doesnt require constant re-rendering
    private renderingUpdate() {
        this.renderer.drawRect({ x: 0, y: 0}, { x: 100, y: 100 });
    }
}
