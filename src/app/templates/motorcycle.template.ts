import { VehicleTemplate } from "./vehicle.template";
import { Brand } from "../models/brand";
import { HookType } from "../models/enums/hook-type";
import { Injectable } from "@angular/core";

@Injectable()
export class MotorcycleTemplate extends VehicleTemplate {
    public getHookTypes(): HookType[] {
        return [ HookType.None, HookType.Light ];
    }
    public getBrands(): Brand[] {
        return [ new Brand("Honda", ["Varadero","CRF","XRV"]),
        new Brand("Kawasaki", ["ER-6F", "Ninja", "Z300","ZXR"]),
        new Brand("Yamaha", ["Fazer8","MT-01","Tracer","Tricker"]) ];    
    }
    public getPassengersCounts(): number[] {
        return [1,2];
    }

    public getMaxEngineCapacity(): number {
        return 3;
    }
    public getMinEngineCapacity(): number {
        return 0.1;
    }
    public getEngineCapacityStep(): number {
        return 0.1;
    }

    public getMaxEnginePower(): number {
        return 70;
    }
    public getMinEnginePower(): number {
        return 4;
    }

    public getMinWeight(): number {
        return 200;
    }
    public getMaxWeight(): number {
        return 2500;
    }
}