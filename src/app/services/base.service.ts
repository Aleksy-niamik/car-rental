import { Repository } from '../repositories/repository';
import { AddingService } from './adding.service';
import { DeletingService } from './deleting.service';
import { INameable } from '../interfaces/INameable';
import { ILoggable } from '../interfaces/ILoggable';
import { Subject, Observable } from 'rxjs';

export class BaseService<T extends INameable> implements ILoggable{
    public adding: AddingService<T>;
    public deleting: DeletingService<T>;

    private onAfterActionEvent: Subject<T> = new Subject<T>();
    private message: string = '';


    constructor(protected repository: Repository<T>) {
        this.adding = new AddingService<T>(repository);
        this.deleting = new DeletingService<T>(repository);

        this.adding.onAfterAction().subscribe(l => {
            this.message = this.adding.getMessage(l);
            this.onAfterActionEvent.next(l); 
        });
        this.deleting.onAfterAction().subscribe(l => {
            this.message = this.deleting.getMessage(l);
            this.onAfterActionEvent.next(l);
        });
    }

    public onAfterAction(): Observable<T> {
        return this.onAfterActionEvent.asObservable();
    }

    public getMessage(object: T): string {
        return this.message;
    }


}