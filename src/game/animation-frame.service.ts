import { Injectable } from '@angular/core';
import {interval, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimationFrameService {

  private readonly refresh$: Subject<void> = new Subject<void>();

  constructor() {
    interval(10)
      .subscribe(() => this.refresh$.next());
  }

  onRefresh(): Observable<void> {
    return this.refresh$.asObservable();
  }
}
