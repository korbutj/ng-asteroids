import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { ShipComponent } from './ship/ship.component';
import { AsteroidComponent } from './asteroid/asteroid.component';



@NgModule({
  declarations: [GameComponent, ShipComponent, AsteroidComponent],
  imports: [
    CommonModule
  ]
})
export class GameModule { }
