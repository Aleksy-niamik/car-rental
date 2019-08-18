import { VehicleType } from './enums/vehicle-type';
import { HookType } from './enums/hook-type';
import { LendStatus } from './enums/lend-status';
import { ILendable } from '../interfaces/ILendable';

export abstract class Vehicle implements ILendable{
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

  public lendStatus: LendStatus;
  public getName(): string {
    return this.name;
  }
}
