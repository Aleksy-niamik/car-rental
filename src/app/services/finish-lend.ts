import { ILendable } from '../interfaces/ILendable';
import { LendStatus } from '../models/enums/lend-status';
import { Service } from './service';
import { ILoggable } from '../interfaces/ILoggable';
import { Injectable } from '@angular/core';

@Injectable()
export class FinishLendService extends Service<ILendable> implements ILoggable{  
    protected actionCore(object: ILendable): void {
        if(object.lendStatus != LendStatus.Borrowed) {
            throw new Error(`Cannot borrow object with status ${object.lendStatus}`);
        }
        object.lendStatus = LendStatus.ReadyToBorrow;
    }

    public getMessage(object: ILendable): string {
        return `Object ${object.getName()} has been returned.`;
        ;
    }
}