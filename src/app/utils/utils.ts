import { IfStmt } from '@angular/compiler';
import { VehicleType } from '../models/enums/vehicle-type';
import { HookType } from '../models/enums/hook-type';
import { LendStatus } from '../models/enums/lend-status';
import { Repository } from '../repositories/repository';
import { Entity } from '../models/entity';
import { Vehicle } from '../models/vehicle';
import { Trailer } from '../models/trailer';

export class Utils {
    public static getRandomDigit(from: number,to: number): number{
        return Math.floor(Math.random() * (to - from + 1)) + from;
    }

    public static getRandomDigitExtra(step: number, from: number,to: number): number{
        if(from > to ){
            let buf: number = to;
            to = from;
            from = buf;
        }
        if(step <= 0) throw Error("Ujemny skok");
        if(from/step - Math.floor(from/step) != 0) from += step - (from/step - Math.floor(from/step)) * step;
        to -= (to/step - Math.floor(to/step)) * step;
        let numberOfSteps: number = Math.floor((to - from) / step);
        let result: number = this.getRandomDigit(0,numberOfSteps) * step + from;
        let precision: number = 0;
        while(true) {
            if(step*Math.pow(10, precision) == Math.floor(step*Math.pow(10, precision))) break;
            else precision++;
        }
        return Math.floor(result * Math.pow(10, precision)) / Math.pow(10, precision);
    }

    public static translateVehicleType(type: VehicleType): string {
        switch(type) {
          case VehicleType.Bus: return 'bus';
          case VehicleType.Truck: return 'truck';
          case VehicleType.PassengerCar: return 'passenger car';
          case VehicleType.Motorcycle: return 'motorcycle'; 
        }
    }

    public static translateHookType(type: HookType): string {
        switch(type) {
          case HookType.HeavyTruck: return 'heavy truck';
          case HookType.Truck: return 'truck';
          case HookType.Light: return 'light';
        }
    }

    public static translateLendStatus(type: LendStatus): string {
        switch(type) {
          case LendStatus.Borrowed: return 'borrowed';
          case LendStatus.ReadyToBorrow: return 'ready to borrow';
          case LendStatus.Unavailable: return 'unavailable to lend';
        }
    }

    public static getFreeId(repository: Repository<Entity>): number {
        for(let i=0; i<repository.getAll().length; i++){
            if(repository.getAll().filter((l) => l.id==i).length == 0) return i;
        }
        return repository.getAll().length;
    }

    public static setVehicleRandomUniqueId(vehicle: Vehicle) {
        switch(vehicle.vehicleType) {
            case VehicleType.Bus: vehicle.uniqueId = "BUS_"; break;
            case VehicleType.PassengerCar: vehicle.uniqueId = "OSO_"; break;
            case VehicleType.Truck: vehicle.uniqueId = "CIE_"; break;
            case VehicleType.Motorcycle: vehicle.uniqueId = "MOT_"; break;
        }
        for(let i=0;i<6;i++)
            vehicle.uniqueId += this.getRandomDigit(0,9);
    }

    public static setTrailerRandomUniqueId(trailer: Trailer) {
        trailer.uniqueId = "TRA_";
        for(let i=0;i<6;i++)
            trailer.uniqueId += this.getRandomDigit(0,9);
    }
}