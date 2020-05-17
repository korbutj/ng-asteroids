import { Injectable } from '@angular/core';
import {Position} from "../movement";

@Injectable({
  providedIn: 'root'
})
export class AsteroidPositionService {

  private readonly asteroidIdToPosition: Map<string, Position> = new Map<string, Position>();

  set(asteroidId: string, position: Position): void {
    this.asteroidIdToPosition.set(asteroidId, position);
  }

  get(asteroidId: string): Position {
    return this.asteroidIdToPosition.get(asteroidId);
  }

}

