import { Subject, Observable } from 'rxjs';

export abstract class Service<T> {
    private onBeforeActionEvent: Subject<T> = new Subject<T>();
    private onAfterActionEvent: Subject<T> = new Subject<T>();

    public action(object: T) {
        this.beforeAction(object);
        this.onBeforeActionEvent.next(object);
        this.actionCore(object);
        this.afterAction(object);
        this.onAfterActionEvent.next(object);
    }

    public onBeforeAction(): Observable<T> {
        return this.onBeforeActionEvent.asObservable();
    }

    public onAfterAction(): Observable<T> {
        return this.onAfterActionEvent.asObservable();
    }

    protected afterAction(object: T): void { }
    protected beforeAction(object: T): void { }
    protected abstract actionCore(object: T): void;
}