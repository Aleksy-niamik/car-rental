import { VehicleType } from './enums/vehicle-type';
import { HookType } from './enums/hook-type';
import { LendStatus } from './enums/lend-status';
import { ILendable } from '../interfaces/ILendable';
import { Entity } from './entity';

export abstract class Vehicle extends Entity implements ILendable {
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
  public price: number;
  public getName(): string {
    return this.name;
  }
}
