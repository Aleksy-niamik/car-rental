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
import { TrailerFactory } from './factories/trailer.factory';
import { TrailerService } from './services/trailer.service';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'car-rental';
  private loggerService: LoggerService;

  constructor(
      private readonly vehicleRepository: VehicleRepository,
      private readonly trailerRepository: TrailerRepository,
      private seed: Seed,
      private busFactory: BusFactory,
      private motorcycleFactory: MotorcycleFactory,
      private passengerCarFactory: PassengerCarFactory,
      private truckFactory: TruckFactory,
      private trailerFactory: TrailerFactory,
      private vehicleService: VehicleService,
      private trailerService: TrailerService, 
      private lendService: LendService,
      private finishLendService: FinishLendService) {

        this.loggerService = new LoggerService([lendService, finishLendService, vehicleService, trailerService]);

  }

  ngOnInit() {
    this.seed.seedData();

    this.lendService.action(this.vehicleRepository.getAll()[0]);

   // this.finishLendService.action(this.vehicleRepository.getAll()[0]);

    console.table(this.vehicleRepository.getAll());
    console.table(this.trailerRepository.getAll());
  }
}
