import { Observable } from 'rxjs';

export interface ILoggable {
    getMessage(l: any): string;
    onAfterAction(): Observable<any>;
}