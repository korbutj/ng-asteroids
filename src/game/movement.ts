export type SpeedVectorComponents = {
  readonly horizontalSpeed: number;
  readonly verticalSpeed: number;
}

export type Position = {
  readonly x: number;
  readonly y: number;
}

export class Movement {

  //Angle at which the object moves (with respect to horizontal axis)
  angle: number;
  currentPosition: Position;

  protected speedVector: SpeedVectorComponents;
  protected speed: number;

  // TODO: no optional parameters, responsibility for generating parameters should be outside
  constructor(angleValue?: number, speedValue?: number) {
    if (isNaN(angleValue)) {
      // TODO: util
      angleValue = Math.random() * 2 * Math.PI;
    }

    if (isNaN(speedValue)) {
      speedValue = Math.random(); //TODO: * parameter - to be defined
    }

    this.angle = angleValue;
    this.speed = speedValue;

    this.establishSpeedComponents();
  }

  update(deltaTime: number) {
    this.updatePosition(deltaTime);
  }

  private establishSpeedComponents() {
    this.speedVector = {
      horizontalSpeed: (this.speed * Math.cos(this.angle)),
      verticalSpeed: (this.speed * Math.sin(this.angle))
    };
  }

  private updatePosition(deltaTime: number) {

    this.currentPosition = {
      x: this.currentPosition.x + this.speedVector.horizontalSpeed * deltaTime,
      y: this.currentPosition.y + this.speedVector.verticalSpeed * deltaTime
    };

    this.handleEdgeCase();
  }

  //TODO logic for handling edge cases
  private handleEdgeCase() {

  }
}
