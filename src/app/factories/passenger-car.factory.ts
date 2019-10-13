import { VehicleFactory } from './vehicle.factory';
import { VehicleType } from '../models/enums/vehicle-type';
import { Utils } from '../utils/utils';
import { PassengerCar } from '../models/vehicles/passenger-car';
import { Injectable } from '@angular/core';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { PassengerCarTemplate } from '../templates/passenger-car.template';

@Injectable()
export class PassengerCarFactory extends VehicleFactory {
    constructor(private vehicleRepository: VehicleRepository, private passengerCarTemplate: PassengerCarTemplate) {
        super(VehicleType.PassengerCar, vehicleRepository, passengerCarTemplate);
    }

    public create(name: string): PassengerCar {
        let newVehicle = new PassengerCar();
        this.fillBaseVehicleData(newVehicle, name);

        newVehicle.hasGPS = (Utils.getRandomDigit(0,1) == 1);

        return newVehicle;
    }

      
}