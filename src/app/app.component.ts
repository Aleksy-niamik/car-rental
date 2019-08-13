import { Component, OnInit } from '@angular/core';
import { CarSharingBaseModule } from './car-sharing-base.module';

import { Vehicle } from './models/vehicle'
import { Bus } from './models/vehicles/bus'
import { VehicleType } from './models/enums/vehicle-type'
import { VehicleFactory } from './factories/vehicle.factory';
import { BusFactory } from './factories/bus.factory';
import { Utils } from './utils/utils';
import { PassengerCarFactory } from './factories/passenger-car.factory';
import { MotorcycleFactory } from './factories/motorcycle.factory';
import { TruckFactory } from './factories/truck.factory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'car-rental';

  ngOnInit() {
    let busFactory = new BusFactory();
    let bus = busFactory.create("Balobus");
    console.table(bus);

    let passengerCarFactory = new PassengerCarFactory();
    let passengerCar = passengerCarFactory.create("Szczwanochód");
    console.table(passengerCar);

    let motorcycleFactory = new MotorcycleFactory();
    let motorcycle = motorcycleFactory.create("Motorud");
    console.table(motorcycle);
    
    let truckFactory = new TruckFactory();
    let truck = truckFactory.create("Ciężarudka");
    console.table(truck);

  }
}
