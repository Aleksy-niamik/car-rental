import { Injectable } from '@angular/core';
import { PassengerCarFactory } from '../factories/passenger-car.factory';
import { MotorcycleFactory } from '../factories/motorcycle.factory';
import { BusFactory } from '../factories/bus.factory';
import { TruckFactory } from '../factories/truck.factory';
import { TrailerFactory } from '../factories/trailer.factory';
import { VehicleService } from '../services/vehicle.service';
import { TrailerService } from '../services/trailer.service';

@Injectable()
export class Seed {    
    constructor(
        private readonly vehicleService: VehicleService,
        private readonly trailerService: TrailerService,
        private busFactory: BusFactory,
        private motorcycleFactory: MotorcycleFactory,
        private passengerCarFactory: PassengerCarFactory,
        private truckFactory: TruckFactory,
        private trailerFactory: TrailerFactory) {

    }

    public seedData(): void {
        this.seedTrailers();
        this.seedVehicles();
    }

    private seedVehicles(): void {
        this.vehicleService.adding.action(this.busFactory.create("Balobus"));
        this.vehicleService.adding.action(this.passengerCarFactory.create("Szczwanochód"));
        this.vehicleService.adding.action(this.motorcycleFactory.create("Motorud"));
        this.vehicleService.adding.action(this.truckFactory.create("Ciężarudka"));
    }

    private seedTrailers(): void {
        for(let i=0; i<5; i++)
            this.trailerService.adding.action(this.trailerFactory.create());
    }
}