import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './menu/menu.component';
import {RouterModule} from "@angular/router";
import {ColoredTitleComponent} from "./colored-title/colored-title.component";

@NgModule({
  declarations: [MenuComponent, ColoredTitleComponent],
  exports: [MenuComponent, ColoredTitleComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class MenuModule {
}
