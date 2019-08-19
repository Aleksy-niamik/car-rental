import { Service } from './service';
import { Repository } from '../repositories/repository';
import { ILoggable } from '../interfaces/ILoggable';
import { INameable } from '../interfaces/INameable';

export class AddingService<T extends INameable> extends Service<T> implements ILoggable{  
    constructor(private repository: Repository<T>) {
        super();
    }

    protected actionCore(object: T): void {
        this.repository.add(object);
    }

    public getMessage(object: T): string {
        return `Added the ${object.getName()} object to the ${this.repository.getName()}.`;
    }
}