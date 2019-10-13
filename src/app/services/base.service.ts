import { Repository } from '../repositories/repository';
import { AddingService } from './adding.service';
import { DeletingService } from './deleting.service';
import { INameable } from '../interfaces/INameable';
import { ILoggable } from '../interfaces/ILoggable';
import { Subject, Observable } from 'rxjs';
import { Entity } from '../models/entity';

export class BaseService implements ILoggable{
    public adding: AddingService;
    public deleting: DeletingService;

    private onAfterActionEvent: Subject<Entity> = new Subject<Entity>();
    private message: string = '';


    constructor(protected repository: Repository<Entity>) {
        this.adding = new AddingService(repository);
        this.deleting = new DeletingService(repository);

        this.adding.onAfterAction().subscribe(l => {
            this.message = this.adding.getMessage(l);
            this.onAfterActionEvent.next(l); 
        });
        this.deleting.onAfterAction().subscribe(l => {
            this.message = this.deleting.getMessage(l);
            this.onAfterActionEvent.next(l);
        });
    }

    public onAfterAction(): Observable<Entity> {
        return this.onAfterActionEvent.asObservable();
    }

    public getMessage(object: Entity): string {
        return this.message;
    }


}