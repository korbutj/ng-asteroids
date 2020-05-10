import {Component, Input, HostBinding, OnChanges, SimpleChanges, Host} from '@angular/core';
import {Position} from "../movement";

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent implements OnChanges {

  

  @Input()
  shipInMove: boolean = false;

  @Input()
  position: Position;

  @Input()
  angle: number;

  @HostBinding('style.left.px')
  x: number;
  
  @HostBinding('style.top.px')
  y: number;

  @HostBinding('style.transform')
  transform: string;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.position)
    {
      this.x = this.position.x;
      this.y = this.position.y;
    }
    if(changes.angle)
    {
      this.transform = `rotate(${this.angle}rad)`
    }
  }
}
