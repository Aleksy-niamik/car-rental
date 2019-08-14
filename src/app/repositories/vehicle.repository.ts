import { VehicleType } from '../models/enums/vehicle-type';
import { Repository } from './repository';
import { Vehicle } from '../models/vehicle';

export class VehicleRepository extends Repository<Vehicle> {
    public getByVehicleType(type: VehicleType): Vehicle[] {
        return this.items.filter(s => s.vehicleType == type);
    }
}