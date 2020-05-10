import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KeyboardHandlerService {

  private readonly up$: Subject<void> = new Subject<void>();
  private readonly down$: Subject<void> = new Subject<void>();
  private readonly left$: Subject<void> = new Subject<void>();
  private readonly right$: Subject<void> = new Subject<void>();

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
      this.assignEvents();
   }

   onUp(): Observable<void> {
      return this.up$.asObservable();
   }

   onDown(): Observable<void> {
      return this.down$.asObservable();
   }

   onLeft(): Observable<void> {
      return this.left$.asObservable();
   }

   onRight(): Observable<void> {
      return this.right$.asObservable();
   }

   private assignEvents() {
      fromEvent(this.document, 'keydown')
      .subscribe((event: KeyboardEvent) => {
          this.handleKey(event.key);
      });
   }

   private handleKey(key: string): void {
      switch (key.toLowerCase())
      {
        case 'arrowup':
        case 'w':
          this.up$.next();
          break;
        case 'arrowdown':
        case 's':
          this.down$.next();
          break;
        case 'arrowleft':
        case 'a':
          this.left$.next();
          break;
        case 'arrowright':
        case 'd':
          this.right$.next();
          break;
      }
   }
}
