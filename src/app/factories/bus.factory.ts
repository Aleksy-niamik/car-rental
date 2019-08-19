import { VehicleFactory } from './vehicle.factory';
import { VehicleType } from '../models/enums/vehicle-type';
import { Bus } from '../models/vehicles/bus';
import { Utils } from '../utils/utils';
import { HookType } from '../models/enums/hook-type';
import { Brand } from '../models/brand';
import { Injectable } from '@angular/core';

@Injectable()
export class BusFactory extends VehicleFactory {
    constructor() {
        super(VehicleType.Bus);
        this.fillBrandArray();
    }

    public create(name: string): Bus {
        let newVehicle = new Bus();
        this.fillBaseVehicleData(newVehicle, name);

        newVehicle.doorsCount = Utils.getRandomDigit(1,3);
        newVehicle.floorsCount = Utils.getRandomDigit(1,2);

        return newVehicle;
    }

    protected getMaxEngineCapacity(): number {
        return 11;
    }
    protected getMinEngineCapacity(): number {
        return 3;
    }

    protected getMaxEnginePower(): number {
        return 400;
    }
    protected getMinEnginePower(): number {
        return 120;
    }

    protected getMinWeight(): number {
        return 8000;
    }
    protected getMaxWeight(): number {
        return 27000;
    }

    protected fillBrandArray(): void {
        this.brandArray.push(new Brand("Mercedes-Benz", ["Tourismo","Citaro","eCitaro","Conecto","Sprinter"]));
        this.brandArray.push(new Brand("Ford", ["a", "b","c","d","e"]));
        this.brandArray.push(new Brand("Renault", ["RenaultBus"]));
        this.brandArray.push(new Brand("Fiat", ["FiatBus", "126p++"]));
    }

    protected getRandomHookType(): HookType {
        return Utils.getRandomDigit(HookType.None, HookType.Truck);
    }

    protected getPassengersCountsTable(): number[] {
        return [7,8,9,15,16,17,18,19,20,21,22,25,28,31,32,33,39,42,45,48,51,54,57,60,63,65];
    }
}