import {ApplicationRef, ChangeDetectorRef, Component} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {GITHUB_URL} from "../../consts";
import {filter, take} from "rxjs/operators";

@Component({
  selector: 'app-menu',
  template: `
    <app-colored-title text="ng-asteroids"></app-colored-title>
    <h2>asteroids game version based on angular</h2>
    <div style="margin-top: 20px;">
      <button (click)="play()">PLAY!</button>
      <button (click)="about()">ABOUT</button>
      <button (click)="github()">GITHUB</button>
    </div>

  `
})
export class MenuComponent {

  constructor(private readonly router: Router,
              private readonly detectorRef: ChangeDetectorRef,
              private readonly applicationRef: ApplicationRef) {

    // This one is magic for working with router and noop zones
    router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        take(1)
      )
      .subscribe(() => {
        detectorRef.markForCheck();
        applicationRef.tick();
      })

  }

  play(): void {
    this.router.navigateByUrl('/play');
  }

  about(): void {
    // TODO: Modal with info
  }

  github(): void {
    window.open(GITHUB_URL, '_blank')
  }

}
