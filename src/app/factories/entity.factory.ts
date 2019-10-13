import { Repository } from '../repositories/repository';
import { Entity } from '../models/entity';
import { Utils } from '../utils/utils';

export abstract class EntityFactory {
    
    private repository: Repository<Entity>;

    constructor(_repository: Repository<Entity>) {
        this.repository = _repository;
    }
    protected giveId(entity: Entity): void {
        entity.id = Utils.getFreeId(this.repository);
    }

    
}