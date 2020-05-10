import {Component, OnDestroy, OnInit, ChangeDetectorRef, ApplicationRef} from '@angular/core';
import {AnimationFrameService} from '../animation-frame.service';
import {Subject} from 'rxjs';
import {takeUntil, filter, take} from 'rxjs/operators';
import { KeyboardHandlerService } from '../keyboard-handler.service';
import { Router, NavigationEnd } from '@angular/router';
import { Movement } from '../movement';
import {Position} from "../movement";

@Component({
  selector: 'app-game',
  template: `
    <app-ship [shipInMove]="shipInMove" [position]="shipPosition" [angle]="shipAngle"></app-ship>
  `,
  styles: []
})
export class GameComponent implements OnInit, OnDestroy {
  shipInMove: boolean = false;
  shipPosition: Position = {x: 200, y: 300};
  shipAngle: number = 1;

  private shipMovement: Movement = new Movement(0, 10, {x: 500, y: 500})

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private animationFrameService: AnimationFrameService,
              private keyboardHandlerService: KeyboardHandlerService,
              private readonly router: Router,
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
      });

      this.shipPosition = this.shipMovement.currentPosition;
      this.shipAngle = this.shipMovement.angle;
  }

  ngOnInit(): void {
    
    this.animationFrameService.onRefresh()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
      });

    this.assignEvents();

    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  

  private assignEvents()
  {
    this.keyboardHandlerService.onUp()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((value) => {
      this.shipInMove = value;
      this.shipPosition = this.shipMovement.updatePosition(1);
      this.detectorRef.detectChanges();
    });

    this.keyboardHandlerService.onLeft()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((value) => {
      this.shipInMove = value;
      this.shipAngle = this.shipMovement.updateAngle(false);
      this.detectorRef.detectChanges();
    });

    this.keyboardHandlerService.onRight()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((value) => {
      this.shipInMove = value;
      this.shipAngle = this.shipMovement.updateAngle(true);
      this.detectorRef.detectChanges();
    });
  }
}
