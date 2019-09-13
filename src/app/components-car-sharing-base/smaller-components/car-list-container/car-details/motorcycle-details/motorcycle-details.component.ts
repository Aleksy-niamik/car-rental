import { Component, OnInit, Input } from '@angular/core';
import { Motorcycle } from 'src/app/models/vehicles/motorcycle';

@Component({
  selector: 'motorcycle-details',
  templateUrl: './motorcycle-details.component.html',
  styleUrls: ['./motorcycle-details.component.css']
})
export class MotorcycleDetailsComponent implements OnInit {

  @Input()
  public selectedVehicle: Motorcycle;
  constructor() { }

  ngOnInit() {
  }

}
