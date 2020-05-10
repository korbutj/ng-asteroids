export type SpeedVectorComponents = {
  readonly horizontalSpeed: number;
  readonly verticalSpeed: number;
};

export type Position = {
  readonly x: number;
  readonly y: number;
};

export class Movement {

  // Angle at which the object moves (with respect to horizontal axis)
  angle: number;
  currentPosition: Position;

  private readonly angleSpeed: number = Math.PI/50;
  private readonly acceleration: number = 0.3;
  protected speedVector: SpeedVectorComponents;
  protected speed: number;

  // TODO: no optional parameters, responsibility for generating parameters should be outside
  constructor(angleValue: number, speedValue: number, startingPosition: Position) {
    this.angle = angleValue;
    this.speed = speedValue;
    this.currentPosition = startingPosition;
    this.establishSpeedComponents();
  }

  updateAngle(isRight: boolean): number {
    if(isRight){
      this.angle += this.angleSpeed;
    }
    else{
      this.angle -= this.angleSpeed;
    }
    return this.angle;
  }

  updateSpeed(direction: number): void{
    this.speed += direction * this.acceleration;
    if(this.speed < 0)
      this.speed = 0;
  }

  private establishSpeedComponents(): void {
    this.speedVector = {
      horizontalSpeed: (this.speed * Math.cos(this.angle-Math.PI/2)),
      verticalSpeed: (this.speed * Math.sin(this.angle-Math.PI/2))
    };
  }

  updatePosition(deltaTime: number): Position {
    this.establishSpeedComponents();
    this.currentPosition = {
      x: this.currentPosition.x + this.speedVector.horizontalSpeed * deltaTime,
      y: this.currentPosition.y + this.speedVector.verticalSpeed * deltaTime
    };
    return this.currentPosition;
  }
}
