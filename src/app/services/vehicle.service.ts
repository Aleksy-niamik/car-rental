import { BaseService } from './base.service';
import { Vehicle } from '../models/vehicle';
import { ILoggable } from '../interfaces/ILoggable';

export class VehicleService extends BaseService<Vehicle> {
    public getMessage(object: Vehicle): string {
        return `${super.getMessage(object)} Done by VehicleService`;
    }
}