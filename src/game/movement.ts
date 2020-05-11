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

  private readonly angleSpeed: number = Math.PI / 50;
  private readonly acceleration: number = 0.3;
  protected speedVector: SpeedVectorComponents;
  protected speed: number;

  // TODO: no optional parameters, responsibility for generating parameters should be outside
  constructor(angleValue: number, speedValue: number, startingPosition: Position) {
    this.angle = angleValue;
    this.speed = speedValue;
    this.currentPosition = startingPosition;
    this.establishSpeedVectorComponents();
  }

  rotateLeft(): number {
    this.angle -= this.angleSpeed;
    return this.angle;
  }

  rotateRight(): number {
    this.angle += this.angleSpeed;
    return this.angle;
  }

  updateSpeed(direction: number): void {
    this.speed += direction * this.acceleration;
    if (this.speed < 0) {
      this.speed = 0;
    }
  }

  accelerate(): void {
    this.speed += this.acceleration;
  }

  deaccelerate(): void {
    this.speed -= this.acceleration;
  }

  private establishSpeedVectorComponents(): void {
    this.speedVector = {
      horizontalSpeed: (this.speed * Math.cos(this.normalizeAngle(this.angle))),
      verticalSpeed: (this.speed * Math.sin(this.normalizeAngle(this.angle)))
    };
  }

  updatePosition(): Position {
    this.establishSpeedVectorComponents();
    this.currentPosition = {
      x: this.currentPosition.x + this.speedVector.horizontalSpeed,
      y: this.currentPosition.y + this.speedVector.verticalSpeed
    };
    return this.currentPosition;
  }

  // Normalizes angle to fit the SVG starting rotation
  private normalizeAngle(angle: number): number {
    return angle - Math.PI / 2;
  }
}
