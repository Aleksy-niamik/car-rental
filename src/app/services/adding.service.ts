import { Service } from './service';
import { Repository } from '../repositories/repository';
import { ILoggable } from '../interfaces/ILoggable';
import { INameable } from '../interfaces/INameable';
import { Entity } from '../models/entity';

export class AddingService extends Service<Entity> implements ILoggable{  
    constructor(private repository: Repository<Entity>) {
        super();
    }

    protected actionCore(object: Entity): void {
        this.repository.add(object);
    }

    public getMessage(object: Entity): string {
        return `Added the ${object.id} object to the ${this.repository.getName()}.`;
    }
}