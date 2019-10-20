import { VehicleType } from '../models/enums/vehicle-type';
import { Vehicle } from '../models/vehicle';
import { Utils } from '../utils/utils';
import { Brand } from '../models/brand';
import { LendStatus } from '../models/enums/lend-status';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { EntityFactory } from './entity.factory';
import { VehicleTemplate } from '../templates/vehicle.template';

export abstract class VehicleFactory extends EntityFactory{
    private vehicleType: VehicleType;
    protected vehicleTemplate: VehicleTemplate;

    constructor(_vehicleType: VehicleType,
         vehicleRepository: VehicleRepository,
         _vehicleTemplate: VehicleTemplate) {
        super(vehicleRepository);
        this.vehicleType = _vehicleType;
        this.vehicleTemplate = _vehicleTemplate;
    }
    protected fillBaseVehicleData(vehicle: Vehicle, name: string): void {
        vehicle.name = name;
        this.giveId(vehicle);
        vehicle.weight = Utils.getRandomDigit(
            this.vehicleTemplate.getMinWeight(),
            this.vehicleTemplate.getMaxWeight());
        vehicle.vehicleType = this.vehicleType;
        vehicle.licensePlate = this.getRandomLicensePlate();
        vehicle.yearOfProduction = Utils.getRandomDigit(
            this.vehicleTemplate.getMinYearOfProduction(),
            this.vehicleTemplate.getMaxYearOfProduction());
        vehicle.travelledKilometers = this.getRandomTravelledKilometersNumber();
        vehicle.engineCapacity = Utils.getRandomDigitExtra(
            this.vehicleTemplate.getEngineCapacityStep(),
            this.vehicleTemplate.getMinEngineCapacity(),
            this.vehicleTemplate.getMaxEngineCapacity());
        vehicle.enginePowerInkW = Utils.getRandomDigitExtra(
            this.vehicleTemplate.getEnginePowerStep(),
            this.vehicleTemplate.getMinEnginePower(),
            this.vehicleTemplate.getMaxEnginePower());
        vehicle.passengersCount = this.vehicleTemplate.getPassengersCounts()[
            Utils.getRandomDigit(0,this.vehicleTemplate.getPassengersCounts().length-1)];
        this.getRandomBrandAndModel(vehicle);
        vehicle.hookType = this.vehicleTemplate.getHookTypes()[
            Utils.getRandomDigit(0,this.vehicleTemplate.getHookTypes().length-1)];

        vehicle.lendStatus = LendStatus.ReadyToBorrow;
        vehicle.price = Utils.getRandomDigitExtra(
            this.vehicleTemplate.getPriceStep(),
            this.vehicleTemplate.getMinPrice(),
            this.vehicleTemplate.getMaxPrice()
        );
        Utils.setVehicleRandomUniqueId(vehicle);
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
        let brand: Brand;
        brand = this.vehicleTemplate.getBrands()[Utils.getRandomDigit(0,this.vehicleTemplate.getBrands().length - 1)];
        vehicle.brand = brand.name;
        vehicle.model = brand.getRandomModel();
    }
}