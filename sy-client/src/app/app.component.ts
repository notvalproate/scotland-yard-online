import { Component } from '@angular/core';
import { GameCanvasComponent } from "./game-canvas/game-canvas.component";
import { GameOverlayComponent } from "./game-overlay/game-overlay.component";

@Component({
    selector: 'app-root',
    imports: [GameCanvasComponent, GameOverlayComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {}
