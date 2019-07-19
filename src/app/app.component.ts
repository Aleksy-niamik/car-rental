import { Component, OnInit } from '@angular/core';
import { CarSharingBaseModule } from './car-sharing-base.module';

import { Vehicle } from './models/vehicle'
import { VehicleType } from './models/enums/vehicle-type'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'car-rental';

  ngOnInit() {
    console.log("test");
    let veh = new Vehicle();
    veh.vehicleType = VehicleType.Bus;
    veh.licensePlate = "STA 13579";
    veh.yearOfProduction = 1410;

    console.log(veh);
  }
}
