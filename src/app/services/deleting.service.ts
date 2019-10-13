import { Service } from './service';
import { Repository } from '../repositories/repository';
import { INameable } from '../interfaces/INameable';
import { ILoggable } from '../interfaces/ILoggable';
import { Entity } from '../models/entity';

export class DeletingService extends Service<Entity> implements ILoggable {  
    constructor(private repository: Repository<Entity>) {
        super();
    }

    protected actionCore(object: Entity): void {
        this.repository.delete(object);
    }

    public getMessage(object: Entity): string {
        return `Deleted the ${object.id} object from ${this.repository.getName()} repository.`;
    }
}