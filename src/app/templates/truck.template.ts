import { VehicleTemplate } from "./vehicle.template";
import { Brand } from "../models/brand";
import { HookType } from "../models/enums/hook-type";
import { Injectable } from "@angular/core";

@Injectable()
export class TruckTemplate extends VehicleTemplate {
    public getHookTypes(): HookType[] {
        return [HookType.None, HookType.Truck, HookType.HeavyTruck];
    }
    
    public getPassengersCounts(): number[] {
        return [2,3];
    }
    
    public getBrands(): Brand[] {
        return [new Brand("Volvo", ["FH","FH16","FE"]),
        new Brand("Jelcz", ["C642D","P662D"])];
    }

    public getMaxEngineCapacity(): number {
        return 13;
    }
    public getMinEngineCapacity(): number {
        return 3;
    }

    public getEnginePowerStep(): number {
        return 10;
    }
    public getMaxEnginePower(): number {
        return 900;
    }
    public getMinEnginePower(): number {
        return 300;
    }

    public getMinWeight(): number {
        return 3500;
    }
    public getMaxWeight(): number {
        return 50000;
    }
}