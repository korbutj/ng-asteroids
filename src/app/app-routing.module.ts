import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuComponent} from "../menu/menu/menu.component";
import {GameComponent} from "../game/game/game.component";

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'play', component: GameComponent },
  { path: '', redirectTo: '/menu', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
