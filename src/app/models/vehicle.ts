import { VehicleType } from './enums/vehicle-type';
import { HookType } from './enums/hook-type';

export abstract class Vehicle {
  public vehicleType: VehicleType;
  public weight: number;
  public height: number;
  public licensePlate: string;
  public yearOfProduction: number;
  public travelledKilometers: number;
  public engineCapacity: number;
  public brand: string;
  public model: string;
  public hookType: HookType;
}
