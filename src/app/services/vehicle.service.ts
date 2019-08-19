import { BaseService } from './base.service';
import { Vehicle } from '../models/vehicle';
import { Injectable } from '@angular/core';
import { VehicleRepository } from '../repositories/vehicle.repository';

@Injectable()
export class VehicleService extends BaseService<Vehicle> {
    constructor(repository: VehicleRepository) {
        super(repository);
    }
    public getMessage(object: Vehicle): string {
        return `${super.getMessage(object)} Done by VehicleService`;
    }
}