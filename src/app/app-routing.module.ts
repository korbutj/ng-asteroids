import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuComponent} from "../menu/menu/menu.component";
import {GameComponent} from "../game/game/game.component";
import {MenuModule} from "../menu/menu.module";
import {GameModule} from "../game/game.module";

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'play', component: GameComponent },
  { path: '', redirectTo: '/menu', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    MenuModule,
    GameModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
