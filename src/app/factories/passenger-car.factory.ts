import { VehicleFactory } from './vehicle.factory';
import { VehicleType } from '../models/enums/vehicle-type';
import { Utils } from '../utils/utils';
import { HookType } from '../models/enums/hook-type';
import { Brand } from '../models/brand';
import { PassengerCar } from '../models/vehicles/passenger-car';
import { Injectable } from '@angular/core';
import { VehicleRepository } from '../repositories/vehicle.repository';

@Injectable()
export class PassengerCarFactory extends VehicleFactory {
    constructor(private vehicleRepository: VehicleRepository) {
        super(VehicleType.PassengerCar, vehicleRepository);
        this.fillBrandArray();
    }

    public create(name: string): PassengerCar {
        let newVehicle = new PassengerCar();
        this.fillBaseVehicleData(newVehicle, name);

        newVehicle.hasGPS = (Utils.getRandomDigit(0,1) == 1);

        return newVehicle;
    }

    protected getMaxEngineCapacity(): number {
        return 10;
    }
    protected getMinEngineCapacity(): number {
        return 0.5;
    }
    protected getEngineCapacityStep(): number {
        return 0.5;
    }

    protected getMaxEnginePower(): number {
        return 500;
    }
    protected getMinEnginePower(): number {
        return 60;
    }

    protected getMinWeight(): number {
        return 1200;
    }
    protected getMaxWeight(): number {
        return 2500;
    }

    protected fillBrandArray(): void {
        this.brandArray.push(new Brand("Honda", ["Acord","Civic"]));
        this.brandArray.push(new Brand("Ford", ["Fiesta", "Mondeo"]));
        this.brandArray.push(new Brand("Renault", ["Clio","Megane"]));
        this.brandArray.push(new Brand("Volkswagen", ["DasAuto","Polo","Golf"]));
        this.brandArray.push(new Brand("Skoda", ["Octavia"]));
    }

    protected getRandomHookType(): HookType {
        return Utils.getRandomDigit(HookType.None, HookType.Truck);
    }

    protected getPassengersCountsTable(): number[] {
        return [2,4,5,7,8];
    }  
}