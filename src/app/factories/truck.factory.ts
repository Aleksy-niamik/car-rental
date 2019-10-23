import { VehicleFactory } from './vehicle.factory';
import { VehicleType } from '../models/enums/vehicle-type';
import { Utils } from '../utils/utils';
import { Truck } from '../models/vehicles/truck';
import { Injectable } from '@angular/core';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { TruckTemplate } from '../templates/truck.template';

@Injectable()
export class TruckFactory extends VehicleFactory {
    constructor(private vehicleRepository: VehicleRepository, private truckTemplate: TruckTemplate) {
        super( VehicleType.Truck, vehicleRepository, truckTemplate );
    }

    public create(name: string): Truck {
        let newVehicle = new Truck();
        this.fillBaseVehicleData(newVehicle, name);

        newVehicle.hasBedroom = (Utils.getRandomDigit(0,1) == 1);

        return newVehicle;
    }
}