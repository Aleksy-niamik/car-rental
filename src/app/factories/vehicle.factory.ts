import { VehicleType } from '../models/enums/vehicle-type';
import { Vehicle } from '../models/vehicle';
import { Utils } from '../utils/utils';
import { HookType } from '../models/enums/hook-type';
import { Brand } from '../models/brand';

export abstract class VehicleFactory {
    private vehicleType: VehicleType;
    protected brandArray: Brand[] = new Array();

    constructor(_vehicleType: VehicleType) {
        this.vehicleType = _vehicleType;
    }
    protected fillBaseVehicleData(vehicle: Vehicle, name: string): void {
        vehicle.name = name;
        vehicle.weight = Utils.getRandomDigit(
            this.getMinWeight(),
            this.getMaxWeight());
        vehicle.vehicleType = this.vehicleType;
        vehicle.licensePlate = this.getRandomLicensePlate();
        vehicle.yearOfProduction = Utils.getRandomDigit(1886, new Date().getFullYear());
        vehicle.travelledKilometers = this.getRandomTravelledKilometersNumber();
        vehicle.engineCapacity = Utils.getRandomDigitExtra(
            this.getEngineCapacityStep(),
            this.getMinEngineCapacity(),
            this.getMaxEngineCapacity());
        vehicle.enginePowerInkW = Utils.getRandomDigitExtra(
            this.getEnginePowerStep(),
            this.getMinEnginePower(),
            this.getMaxEnginePower());
        vehicle.passengersCount = this.getPassengersCountsTable()[Utils.getRandomDigit(0,this.getPassengersCountsTable().length-1)];
        this.getRandomBrandAndModel(vehicle);
        vehicle.hookType = this.getRandomHookType();
    }

    private getRandomLicensePlate(): string {
        let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let licensePlate: string = ''; 

        for(let i=0; i<3; i++)
            licensePlate += letters[Utils.getRandomDigit(0, letters.length-1)];
        
        licensePlate += ' ';

        letters += "0123456789";
        for(let i=0; i<5; i++)
            licensePlate += letters[Utils.getRandomDigit(0, letters.length-1)];
    
        return licensePlate;
    }

    protected getRandomTravelledKilometersNumber(): number {
        return Math.floor(Math.pow(1.2, Utils.getRandomDigit(0,66))) + 1000;
    }

    protected getRandomBrandAndModel(vehicle: Vehicle): void {
        let brandNumber: number;
        brandNumber = Utils.getRandomDigit(0,this.brandArray.length - 1);
        vehicle.brand = this.brandArray[brandNumber].name;
        vehicle.model = this.brandArray[brandNumber].getRandomModel();
    }

    
    protected getEngineCapacityStep(): number {
        return 1;
    }
    protected getEnginePowerStep(): number {
        return 1;
    }

    protected abstract getMaxWeight(): number;
    protected abstract getMinWeight(): number;
    protected abstract getMaxEngineCapacity(): number;
    protected abstract getMinEngineCapacity(): number;
    protected abstract getMaxEnginePower(): number;
    protected abstract getMinEnginePower(): number;
    protected abstract getRandomHookType(): HookType;
    protected abstract fillBrandArray(): void;
    protected abstract getPassengersCountsTable(): number[];

}