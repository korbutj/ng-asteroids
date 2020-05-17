import {Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';
import {Position} from '../movement';

export enum AsteroidType {
  A = 0,
  B = 1,
  C = 2
}

export enum AsteroidSizes {
  SMALL = 40,
  MEDIUM = 80,
  LARGE = 120
}

@Component({
  selector: 'app-asteroid[type]',
  templateUrl: './asteroid.component.html',
  styles: [`

    :host {
      position: absolute;
    }

    :host svg {
      animation: asteroid-rotate 10s infinite linear;
    }

    @keyframes asteroid-rotate {
        from { transform: rotate(0deg) }
        to { transform: rotate(360deg) }
    }
  `]
})
export class AsteroidComponent implements OnChanges {

  @Input()
  type: AsteroidType;

  @Input()
  size: AsteroidSizes;

  @Input()
  position: Position;

  AsteroidType = AsteroidType;

  private readonly nativeElement: HTMLElement;

  constructor(private readonly renderer: Renderer2,
              elementRef: ElementRef) {
    this.nativeElement = elementRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.position) {
      this.renderer.setStyle(
        this.nativeElement,
        'transform',
        `translateX(${this.position.x}px) translateY(${this.position.y}px)`
      );
    }
  }

}
