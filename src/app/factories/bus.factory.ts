import { VehicleFactory } from './vehicle.factory';
import { VehicleType } from '../models/enums/vehicle-type';
import { Bus } from '../models/vehicles/bus';
import { Utils } from '../utils/utils';
import { Injectable } from '@angular/core';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { BusTemplate } from '../templates/bus.template';

@Injectable()
export class BusFactory extends VehicleFactory {
    constructor(private vehicleRepository: VehicleRepository, private busTemplate: BusTemplate) {
        super( VehicleType.Bus, vehicleRepository, busTemplate );
    }

    public create(name: string): Bus {
        let newVehicle = new Bus();
        this.fillBaseVehicleData(newVehicle, name);

        newVehicle.doorsCount = Utils.getRandomDigit(
            this.busTemplate.getMinDoorsCount(),
            this.busTemplate.getMaxDoorsCount() );
        newVehicle.floorsCount = Utils.getRandomDigit(
            this.busTemplate.getMinFloorsCount(),
            this.busTemplate.getMaxFloorsCount() );

        return newVehicle;
    }
}