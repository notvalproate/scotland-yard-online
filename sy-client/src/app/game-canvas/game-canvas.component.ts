import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MapDataService } from '../../shared/services/map-data.service';

@Component({
  selector: 'app-game-canvas',
  imports: [],
  templateUrl: './game-canvas.component.html',
  styleUrl: './game-canvas.component.scss'
})
export class GameCanvasComponent implements AfterViewInit {
    private mapDataService: MapDataService = inject(MapDataService);
    @ViewChild('gameCanvas', { static: false }) private gameCanvas!: ElementRef<HTMLCanvasElement>;
    private ctx: CanvasRenderingContext2D | null = null;

    ngAfterViewInit(): void {
        this.ctx = this.gameCanvas.nativeElement.getContext('2d');
        const canvas = this.gameCanvas.nativeElement;
        canvas.width = 1920;
        canvas.height = 1080;
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.src = 'images/map.webp';

        img.onload = () => {
            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
    }
}
