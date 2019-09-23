import { Repository } from '../repositories/repository';
import { Entity } from '../models/entity';

export abstract class EntityFactory {
    
    private repository: Repository<Entity>;

    constructor(_repository: Repository<Entity>) {
        this.repository = _repository;
    }
    protected giveId(entity: Entity): void {
        entity.id = this.getId();
    }

    private getId(): number {
        for(let i=0; i<this.repository.getAll().length; i++){
            if(this.repository.getAll().filter((l) => l.id==i).length == 0) return i;
        }
        return this.repository.getAll().length;
    }
}