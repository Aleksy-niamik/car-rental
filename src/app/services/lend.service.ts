import { ILendable } from '../interfaces/ILendable';
import { LendStatus } from '../models/enums/lend-status';
import { Service } from './service';
import { ILoggable } from '../interfaces/ILoggable';

export class LendService extends Service<ILendable> implements ILoggable{  
    protected actionCore(object: ILendable): void {
        if(object.lendStatus != LendStatus.ReadyToBorrow) {
            throw new Error(`Cannot borrow object with status ${object.lendStatus}`);
        }
        object.lendStatus = LendStatus.Borrowed;
    }

    public getMessage(object: ILendable): string {
        return `Object ${object.getName()} has been lended.`;
        ;
    }
}