import { HookType } from "../models/enums/hook-type";
import { Brand } from "../models/brand";

export abstract class VehicleTemplate {
    public getEngineCapacityStep(): number {
        return 1;
    }
    public getEnginePowerStep(): number {
        return 1;
    }

    public abstract getMaxWeight(): number;
    public abstract getMinWeight(): number;
    public getMaxYearOfProduction(): number {
        return new Date().getFullYear();
    }
    public getMinYearOfProduction(): number {
        return 1886;
    }
    public abstract getMaxEngineCapacity(): number;
    public abstract getMinEngineCapacity(): number;
    public abstract getMaxEnginePower(): number;
    public abstract getMinEnginePower(): number;
    public abstract getHookTypes(): HookType[];
    public abstract getBrands(): Brand[];
    public abstract getPassengersCounts(): number[];

    public getPriceStep(): number {
        return 100;
    }

    public getMinPrice(): number {
        return 200;
    }

    public getMaxPrice(): number {
        return 90000;
    }

}