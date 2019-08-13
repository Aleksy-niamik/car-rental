import { VehicleType } from './enums/vehicle-type';
import { HookType } from './enums/hook-type';

export abstract class Vehicle {
  public vehicleType: VehicleType;
  public name: string;
  public weight: number;
  public licensePlate: string;
  public passengersCount: number;
  public yearOfProduction: number;
  public travelledKilometers: number;
  public engineCapacity: number;
  public enginePowerInkW: number;
  public brand: string;
  public model: string;
  public hookType: HookType;
}
