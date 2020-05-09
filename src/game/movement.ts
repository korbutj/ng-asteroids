export class Movement {
    //Angle at which the object moves (with respect to horizontal axis)
    protected readonly angle: number;
    public get Angle() : number {
        return this.angle;
    }
    protected readonly currentPosition: Position;
    public get CurrentPosition() : Position {
        return this.currentPosition;
    }
    //Most likely per frame?
    protected readonly speedVector: SpeedVectorComponents;

    protected readonly speed: number;

    constructor(angleValue?: number, speedValue?: number) {
        if(angleValue === undefined)
            angleValue = Math.random() * 2 * Math.PI;

        if(speedValue === undefined)
            speedValue = Math.random(); //TODO: * parameter - to be defined

        this.angle = angleValue;
        this.speed = speedValue;

        this.speedVector.HorizontalSpeed = (this.speed * Math.cos(this.angle));
        this.speedVector.VerticalSpeed = (this.speed * Math.sin(this.angle));
    }


    /**
     * Update
     */
    public Update(deltaTime: number) {
        this.UpdatePosition(deltaTime);
        
    }

    //TODO checking for edge case and teleporting to the other side
    private UpdatePosition(deltaTime: number) {
        this.currentPosition.X += this.speedVector.HorizontalSpeed * deltaTime;
        this.currentPosition.Y += this.speedVector.VerticalSpeed * deltaTime;
    }

}

export class SpeedVectorComponents{
    public HorizontalSpeed: number;
    public VerticalSpeed: number;
}

export class Position{
    public X: number;
    public Y: number;
}
