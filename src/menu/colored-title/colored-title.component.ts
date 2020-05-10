import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {interval, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

export enum LETTER_COLOR {
  WHITE = 'white',
  RED = 'red',
  BLUE = 'blue',
  YELLOW = 'yellow',
  GREEN = 'green',
  PURPLE = 'purple',
  ORANGE = 'orange',
  POMODORE = 'pomodore'
}

@Component({
  selector: 'app-colored-title',
  template: `
    <h1>
        <span *ngFor="let letter of letters; let i = index;trackBy: trackFn" [style.color]="getColor(i)">{{ letter }}</span>
    </h1>
  `
})
export class ColoredTitleComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  text: string;

  // This one requires es6 or polyfill
  colorList: Array<string> = Object.values(LETTER_COLOR);
  letters: Array<string> = [];

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly detectorRef: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.text) {
      this.letters = this.text.split('');
    }
  }

  ngOnInit(): void {
    interval(250)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.shiftColors();
        this.detectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  shiftColors(): void {
    const color = this.colorList.shift();
    this.colorList.push(color);
  }

  getColor(i: number): string {
    const length = this.colorList.length;
    return this.colorList[i % length];
  }

  trackFn(index: number, value: string): string {
    return index + value;
  }

}
