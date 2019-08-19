import { VehicleFactory } from './vehicle.factory';
import { VehicleType } from '../models/enums/vehicle-type';
import { Utils } from '../utils/utils';
import { Brand } from '../models/brand';
import { HookType } from '../models/enums/hook-type';
import { Truck } from '../models/vehicles/truck';
import { Injectable } from '@angular/core';

@Injectable()
export class TruckFactory extends VehicleFactory {
    constructor() {
        super(VehicleType.Truck);
        this.fillBrandArray();
    }

    public create(name: string): Truck {
        let newVehicle = new Truck();
        this.fillBaseVehicleData(newVehicle, name);

        newVehicle.hasBedroom = (Utils.getRandomDigit(0,1) == 1);

        return newVehicle;
    }

    protected getMaxEngineCapacity(): number {
        return 13;
    }
    protected getMinEngineCapacity(): number {
        return 3;
    }

    protected getEnginePowerStep(): number {
        return 10;
    }
    protected getMaxEnginePower(): number {
        return 900;
    }
    protected getMinEnginePower(): number {
        return 300;
    }

    protected getMinWeight(): number {
        return 3500;
    }
    protected getMaxWeight(): number {
        return 50000;
    }

    protected fillBrandArray(): void {
        this.brandArray.push(new Brand("Volvo", ["FH","FH16","FE"]));
        this.brandArray.push(new Brand("Jelcz", ["C642D","P662D"]));
    }

    protected getRandomHookType(): HookType {
        return Utils.getRandomDigit(HookType.None, HookType.HeavyTruck);
    }
    
    protected getPassengersCountsTable(): number[] {
        return [2,3];
    }
}