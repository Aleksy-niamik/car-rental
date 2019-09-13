import { VehicleType } from '../models/enums/vehicle-type';
import { Repository } from './repository';
import { Vehicle } from '../models/vehicle';
import { Injectable } from '@angular/core';

@Injectable()
export class VehicleRepository extends Repository<Vehicle> {
    public getByVehicleType(type: VehicleType): Vehicle[] {
        return this.items.filter(s => s.vehicleType == type);
    }

    public getOrderedByPriceDescending(): Vehicle[] {
        return this.items.sort((a: Vehicle, b: Vehicle) => a.price - b.price);
    }

    public getName(): string {
        return 'vehicle repository';
    }
}