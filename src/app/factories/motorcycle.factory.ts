import { VehicleFactory } from './vehicle.factory';
import { VehicleType } from '../models/enums/vehicle-type';
import { Utils } from '../utils/utils';
import { Brand } from '../models/brand';
import { HookType } from '../models/enums/hook-type';
import { Motorcycle } from '../models/vehicles/motorcycle';
import { Injectable } from '@angular/core';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { MotorcycleTemplate } from '../templates/motorcycle.template';

@Injectable()
export class MotorcycleFactory extends VehicleFactory {
    constructor(private vehicleRepository: VehicleRepository, private motorcycleTemplate: MotorcycleTemplate) {
        super(VehicleType.Motorcycle, vehicleRepository, motorcycleTemplate);
    }

    public create(name: string): Motorcycle {
        let newVehicle = new Motorcycle();
        this.fillBaseVehicleData(newVehicle, name);

        newVehicle.hasTrunk = (Utils.getRandomDigit(0,1) == 1);

        return newVehicle;
    }   
}