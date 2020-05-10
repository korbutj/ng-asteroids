import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KeyboardHandlerService {

  private readonly up$: Subject<boolean> = new Subject<boolean>();
  private readonly down$: Subject<boolean> = new Subject<boolean>();
  private readonly left$: Subject<boolean> = new Subject<boolean>();
  private readonly right$: Subject<boolean> = new Subject<boolean>();

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
      this.assignEvents();
   }

   onUp(): Observable<boolean> {
      return this.up$.asObservable();
   }

   onDown(): Observable<boolean> {
      return this.down$.asObservable();
   }

   onLeft(): Observable<boolean> {
      return this.left$.asObservable();
   }

   onRight(): Observable<boolean> {
      return this.right$.asObservable();
   }

   private assignEvents() {
      fromEvent(this.document, 'keydown')
      .subscribe((event: KeyboardEvent) => {
          this.handleKey(event.key, true);
      });
      fromEvent(this.document, 'keyup')
      .subscribe((event: KeyboardEvent) => {
          this.handleKey(event.key, false);
      });
   }

   private handleKey(key: string, value: boolean): void {
      switch (key.toLowerCase())
      {
        case 'arrowup':
        case 'w':
          this.up$.next(value);
          break;
        case 'arrowdown':
        case 's':
          this.down$.next(value);
          break;
        case 'arrowleft':
        case 'a':
          this.left$.next(value);
          break;
        case 'arrowright':
        case 'd':
          this.right$.next(value);
          break;
      }
   }
}
