import { VehicleTemplate } from "./vehicle.template";
import { HookType } from "../models/enums/hook-type";
import { Injectable } from "@angular/core";
import { Brand } from "../models/brand";

@Injectable()
export class BusTemplate extends VehicleTemplate {
    public getHookTypes(): HookType[] {
        return [HookType.None, HookType.Truck, HookType.Light];
    }
    
    public getPassengersCounts(): number[] {
        return [7,8,9,15,16,17,18,19,20,21,22,25,28,31,32,33,39,42,45,48,51,54,57,60,63,65];
    }
    
    public getBrands(): Brand[] {
        return [ new Brand("Mercedes-Benz", ["Tourismo","Citaro","eCitaro","Conecto","Sprinter"]),
        new Brand("Ford", ["a", "b","c","d","e"]),
        new Brand("Renault", ["RenaultBus"]),
        new Brand("Fiat", ["FiatBus", "126p++"]) ];
    }

    public getMaxEngineCapacity(): number {
        return 11;
    }
    public getMinEngineCapacity(): number {
        return 3;
    }

    public getMaxEnginePower(): number {
        return 400;
    }
    public getMinEnginePower(): number {
        return 120;
    }

    public getMinWeight(): number {
        return 8000;
    }
    public getMaxWeight(): number {
        return 27000;
    }

    public getMinDoorsCount(): number {
        return 1;
    }

    public getMaxDoorsCount(): number {
        return 3;
    }
    
    public getMinFloorsCount(): number {
        return 1;
    }

    public getMaxFloorsCount(): number {
        return 2;
    }
}