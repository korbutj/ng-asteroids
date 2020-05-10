import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnimationFrameService} from '../animation-frame.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-game',
  template: `
    <p>
      game works!
    </p>
  `,
  styles: [
  ]
})
export class GameComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private animationFrameService: AnimationFrameService) { }

  ngOnInit(): void {
    this.animationFrameService.onRefresh()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
