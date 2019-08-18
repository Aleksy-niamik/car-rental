import { ILendable } from '../interfaces/ILendable';
import { VehicleService } from './vehicle.service';
import { Service } from './service';
import { ILoggable } from '../interfaces/ILoggable';

export class LoggerService {
    constructor(private service: ILoggable) {
        this.service.onAfterAction().subscribe(l => this.log(service.getMessage(l)));
    }
    
    public log(message: string): void {
        console.log(message + '...wysłano poprzez loggerService');
    }
}