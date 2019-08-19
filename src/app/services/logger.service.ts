import { ILoggable } from '../interfaces/ILoggable';
import { Injectable } from '@angular/core';

export class LoggerService {
    constructor(private services: ILoggable[]) {
        services.forEach(service => service.onAfterAction().subscribe(l => this.log(service.getMessage(l))));
    }
    
    public log(message: string): void {
        console.log(message + '...wysłano poprzez loggerService');
    }
}