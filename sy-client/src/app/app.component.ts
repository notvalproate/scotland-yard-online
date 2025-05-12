import { Component } from '@angular/core';
import { GameCanvasComponent } from './game-canvas/game-canvas.component';
import { GameOverlayComponent } from './game-overlay/game-overlay.component';
import { GameWrapperComponent } from './game-wrapper/game-wrapper.component';

@Component({
    selector: 'app-root',
    imports: [GameCanvasComponent, GameOverlayComponent, GameWrapperComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {}
