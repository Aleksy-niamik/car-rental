import { Component, OnInit, Input } from '@angular/core';
import { PassengerCar } from 'src/app/models/vehicles/passenger-car';

@Component({
  selector: 'passenger-car-details',
  templateUrl: './passenger-car-details.component.html',
  styleUrls: ['./passenger-car-details.component.css']
})
export class PassengerCarDetailsComponent implements OnInit {

  @Input()
  public selectedVehicle: PassengerCar;
  constructor() { }

  ngOnInit() {
  }

}
