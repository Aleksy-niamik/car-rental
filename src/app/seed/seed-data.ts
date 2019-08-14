import { Injectable } from '@angular/core';
import { PassengerCarFactory } from '../factories/passenger-car.factory';
import { MotorcycleFactory } from '../factories/motorcycle.factory';
import { BusFactory } from '../factories/bus.factory';
import { TruckFactory } from '../factories/truck.factory';
import { TrailerFactory } from '../factories/trailer.factory';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { TrailerRepository } from '../repositories/trailer.repository';

@Injectable()
export class Seed {
    private passengerCarFactory: PassengerCarFactory;
    private motorcycleFactory: MotorcycleFactory;
    private busFactory: BusFactory;
    private truckFactory: TruckFactory;
    private trailerFactory: TrailerFactory;
    
    constructor(private readonly vehicleRepository: VehicleRepository, private readonly trailerRepository: TrailerRepository) {
        this.passengerCarFactory = new PassengerCarFactory();
        this.motorcycleFactory = new MotorcycleFactory();
        this.busFactory = new BusFactory();
        this.truckFactory = new TruckFactory();
        this.trailerFactory = new TrailerFactory();
    }

    public seedData(): void {
        this.seedTrailers();
    }

    // private seedShips(): void {
    //     this.vehicleRepository.add(this.patrolShipFactory.create("Patrol Alpha"));
    //     this.vehicleRepository.add(this.patrolShipFactory.create("Patrol Beta"));
    //     this.vehicleRepository.add(this.battleShipFactory.create("Battle 1"));
    //     this.vehicleRepository.add(this.battleShipFactory.create("Battle 2"));
    //     this.vehicleRepository.add(this.battleShipFactory.create("Battle 3"));
    //     this.vehicleRepository.add(this.patrolShipFactory.create("Patrol Charlie"));
    //     this.vehicleRepository.add(this.patrolShipFactory.create("Patrol Alpha 2"));
    //     this.vehicleRepository.add(this.patrolShipFactory.create("Patrol Beta 2"));
    //     this.vehicleRepository.add(this.patrolShipFactory.create("Patrol Charlie 2"));
    //     this.vehicleRepository.add(this.patrolShipFactory.create("Patrol Alpha 3"));
    //     this.vehicleRepository.add(this.patrolShipFactory.create("Patrol Beta 3"));
    //     this.vehicleRepository.add(this.patrolShipFactory.create("Patrol Charlie 3"));
    // }

    private seedTrailers(): void {
        for(let i=0; i<5; i++)
            this.trailerRepository.add(this.trailerFactory.create());
    }
}