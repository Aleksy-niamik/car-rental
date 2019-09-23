import { VehicleFactory } from './vehicle.factory';
import { VehicleType } from '../models/enums/vehicle-type';
import { Utils } from '../utils/utils';
import { Brand } from '../models/brand';
import { HookType } from '../models/enums/hook-type';
import { Motorcycle } from '../models/vehicles/motorcycle';
import { Injectable } from '@angular/core';
import { VehicleRepository } from '../repositories/vehicle.repository';

@Injectable()
export class MotorcycleFactory extends VehicleFactory {
    constructor(private vehicleRepository: VehicleRepository) {
        super(VehicleType.Motorcycle, vehicleRepository);
        this.fillBrandArray();
    }

    public create(name: string): Motorcycle {
        let newVehicle = new Motorcycle();
        this.fillBaseVehicleData(newVehicle, name);

        newVehicle.hasTrunk = (Utils.getRandomDigit(0,1) == 1);

        return newVehicle;
    }

    protected getMaxEngineCapacity(): number {
        return 3;
    }
    protected getMinEngineCapacity(): number {
        return 0.1;
    }
    protected getEngineCapacityStep(): number {
        return 0.1;
    }

    protected getMaxEnginePower(): number {
        return 70;
    }
    protected getMinEnginePower(): number {
        return 4;
    }

    protected getMinWeight(): number {
        return 200;
    }
    protected getMaxWeight(): number {
        return 2500;
    }

    protected fillBrandArray(): void {
        this.brandArray.push(new Brand("Honda", ["Varadero","CRF","XRV"]));
        this.brandArray.push(new Brand("Kawasaki", ["ER-6F", "Ninja", "Z300","ZXR"]));
        this.brandArray.push(new Brand("Yamaha", ["Fazer8","MT-01","Tracer","Tricker"]));
    }

    protected getRandomHookType(): HookType {
        return Utils.getRandomDigit(HookType.None, HookType.Light);
    }

    protected getPassengersCountsTable(): number[] {
        return [1,2];
    }
}