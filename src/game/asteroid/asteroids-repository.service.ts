import { Injectable } from '@angular/core';
import {Asteroid} from "./asteroid";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AsteroidsRepositoryService {

  private asteroids: Array<Asteroid> = [];
  private readonly asteroids$: Subject<Array<Asteroid>> = new Subject<Array<Asteroid>>();

  add(asteroids: Array<Asteroid>): void {
    this.asteroids = [...this.asteroids, ...asteroids];
    this.asteroids$.next(this.asteroids);
  }

  remove(ids: Array<string>): void {
    this.asteroids = this.asteroids.filter(a => ids.indexOf(a.id) === -1);
    this.asteroids$.next(this.asteroids);
  }

  get(): Observable<Array<Asteroid>> {
    return this.asteroids$.asObservable();
  }
}
