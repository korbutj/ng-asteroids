import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {fromEvent, Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";

export type GameSize = {
  readonly width: number;
  readonly height: number;
}

const DEBOUNCE_TIME = 100;

@Injectable({
  providedIn: 'root'
})
export class GameSizeService {

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
  }

  getGameSize(): Observable<GameSize> {
    const body = this.document.body;
    const sizeGetter = () => {
      return {
        width: body.offsetWidth,
        height: body.offsetHeight
      };
    };

    const sizeComparator = (x, y) => x.height === y.height && x.width === y.width;

    return fromEvent(window, 'resize')
      .pipe(
        debounceTime(DEBOUNCE_TIME),
        map(sizeGetter),
        distinctUntilChanged(sizeComparator)
      );
  }

}
