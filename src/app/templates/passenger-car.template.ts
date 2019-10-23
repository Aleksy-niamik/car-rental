import { VehicleTemplate } from "./vehicle.template";
import { Brand } from "../models/brand";
import { HookType } from "../models/enums/hook-type";
import { Injectable } from "@angular/core";

@Injectable()
export class PassengerCarTemplate extends VehicleTemplate {
    public getMaxEngineCapacity(): number {
        return 10;
    }
    public getMinEngineCapacity(): number {
        return 0.5;
    }
    public getEngineCapacityStep(): number {
        return 0.5;
    }

    public getMaxEnginePower(): number {
        return 500;
    }
    public getMinEnginePower(): number {
        return 60;
    }

    public getMinWeight(): number {
        return 1200;
    }
    public getMaxWeight(): number {
        return 2500;
    }

    public getBrands(): Brand[] {
        return [ new Brand("Honda", ["Acord","Civic"]),
            new Brand("Ford", ["Fiesta", "Mondeo"]),
            new Brand("Renault", ["Clio","Megane"]),
            new Brand("Volkswagen", ["DasAuto","Polo","Golf"]),
            new Brand("Skoda", ["Octavia"]) ];
    }

    public getHookTypes(): HookType[] {
        return [ HookType.None, HookType.Truck, HookType.Light ];
    }

    public getPassengersCounts(): number[] {
        return [2,4,5,7,8];
    }
}