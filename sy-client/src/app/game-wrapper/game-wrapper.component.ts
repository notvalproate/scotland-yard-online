import { Component } from '@angular/core';
import { InteractiveMapComponent } from "./interactive-map/interactive-map.component";

@Component({
  selector: 'app-game-wrapper',
  imports: [InteractiveMapComponent],
  templateUrl: './game-wrapper.component.html',
  styleUrl: './game-wrapper.component.scss'
})
export class GameWrapperComponent {

}
