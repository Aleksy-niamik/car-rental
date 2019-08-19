import { Service } from './service';
import { Repository } from '../repositories/repository';
import { INameable } from '../interfaces/INameable';
import { ILoggable } from '../interfaces/ILoggable';

export class DeletingService<T extends INameable> extends Service<T> implements ILoggable {  
    constructor(private repository: Repository<T>) {
        super();
    }

    protected actionCore(object: T): void {
        this.repository.delete(object);
    }

    public getMessage(object: T): string {
        return `Deleted the ${object.getName()} object from ${this.repository.getName()} repository.`;
    }
}