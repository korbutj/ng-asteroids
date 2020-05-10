export class Movement {
    //Angle at which the object moves (with respect to horizontal axis)
    public readonly angle: number;
    public readonly currentPosition: position;
    protected readonly speedVector: speedVectorComponents;

    protected readonly speed: number;

    constructor(angleValue?: number, speedValue?: number) {
        if(angleValue === undefined)
            angleValue = Math.random() * 2 * Math.PI;

        if(speedValue === undefined)
            speedValue = Math.random(); //TODO: * parameter - to be defined

        this.angle = angleValue;
        this.speed = speedValue;

        this.establishSpeedComponents();
    }

    private establishSpeedComponents() {
        this.speedVector.horizontalSpeed = (this.speed * Math.cos(this.angle));
        this.speedVector.verticalSpeed = (this.speed * Math.sin(this.angle));
    }

    /**
     * Update
     */
    public update(deltaTime: number) {
        this.updatePosition(deltaTime);
    }

    private updatePosition(deltaTime: number) {
        this.currentPosition.x += this.speedVector.horizontalSpeed * deltaTime;
        this.currentPosition.y += this.speedVector.verticalSpeed * deltaTime;
        this.handleEdgeCase();
    }

    //TODO logic for handling edge cases
    private handleEdgeCase()
    {
        
    }
}

export type speedVectorComponents = {
    horizontalSpeed: number;
    verticalSpeed: number;
}

export type position = {
    x: number;
    y: number;
}
