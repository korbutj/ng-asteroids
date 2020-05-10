import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { ShipComponent } from './ship/ship.component';



@NgModule({
  declarations: [GameComponent, ShipComponent],
  imports: [
    CommonModule
  ]
})
export class GameModule { }
