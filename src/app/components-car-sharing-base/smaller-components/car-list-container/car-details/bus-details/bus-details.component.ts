import { Component, OnInit, Input } from '@angular/core';
import { Bus } from 'src/app/models/vehicles/bus';

@Component({
  selector: 'bus-details',
  templateUrl: './bus-details.component.html',
  styleUrls: ['./bus-details.component.css']
})
export class BusDetailsComponent implements OnInit {

  @Input()
  public selectedVehicle: Bus;
  constructor() { }

  ngOnInit() {
  }

}
