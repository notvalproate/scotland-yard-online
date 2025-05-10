import { Component } from '@angular/core';
import { GameWrapperComponent } from './game-wrapper/game-wrapper.component';

@Component({
    selector: 'app-root',
    imports: [GameWrapperComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {}
