import { Component, OnInit, Injectable } from '@angular/core';
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
import { Repository } from './repositories/repository';
import { VehicleRepository } from './repositories/vehicle.repository';
import { TrailerRepository } from './repositories/trailer.repository';
import { Seed } from './seed/seed-data';
import { LoggerService } from './services/logger.service';
import { LendService } from './services/lend.service';
import { VehicleService } from './services/vehicle.service';
import { FinishLendService } from './services/finish-lend';
import { BaseService } from './services/base.service';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'car-rental';
  // public vehicleRepository: VehicleRepository;

  constructor(
      private readonly vehicleRepository: VehicleRepository,
      private readonly trailerRepository: TrailerRepository,
      private seed: Seed){
     // private loggerService: LoggerService,
//private lendService: LendService) {

  }

  ngOnInit() {
    let busFactory = new BusFactory();
    let bus = busFactory.create("Balobus");
    this.vehicleRepository.add(bus);

    let passengerCarFactory = new PassengerCarFactory();
    let passengerCar = passengerCarFactory.create("Szczwanochód");
    this.vehicleRepository.add(passengerCar);

    let motorcycleFactory = new MotorcycleFactory();
    let motorcycle = motorcycleFactory.create("Motorud");
    this.vehicleRepository.add(motorcycle);
    
    let truckFactory = new TruckFactory();
    let truck = truckFactory.create("Ciężarudka");
    this.vehicleRepository.add(truck);

   /* console.log(this.vehicleRepository);
    console.log(this.trailerRepository);
    this.seed.seedData();
    console.log(this.trailerRepository);
    */

    let innyBus: Bus = busFactory.create("Inny Balobus");
    
    let vehicleService: VehicleService = new VehicleService(this.vehicleRepository);
    let loggerServiceAdding = new LoggerService(vehicleService);
    vehicleService.adding.action(innyBus);

    let lendService: LendService = new LendService();
    let loggerService = new LoggerService(lendService);
    lendService.action(this.vehicleRepository.getAll()[0]);

    let finishLendService: FinishLendService = new FinishLendService();
    let loggerService2 = new LoggerService(finishLendService);
    finishLendService.action(this.vehicleRepository.getAll()[0]);

    console.table(this.vehicleRepository.getAll());

    vehicleService.deleting.action(innyBus);

    console.table(this.vehicleRepository.getAll());


  




  }
}
