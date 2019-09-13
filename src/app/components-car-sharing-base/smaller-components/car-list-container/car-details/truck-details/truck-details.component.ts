import { Component, OnInit, Input } from '@angular/core';
import { Truck } from 'src/app/models/vehicles/truck';

@Component({
  selector: 'truck-details',
  templateUrl: './truck-details.component.html',
  styleUrls: ['./truck-details.component.css']
})
export class TruckDetailsComponent implements OnInit {

  @Input()
  public selectedVehicle: Truck;
  constructor() { }

  ngOnInit() {
  }

}
