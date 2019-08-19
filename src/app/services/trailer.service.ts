import { BaseService } from './base.service';
import { Vehicle } from '../models/vehicle';
import { Injectable } from '@angular/core';
import { Trailer } from '../models/trailer';
import { TrailerRepository } from '../repositories/trailer.repository';

@Injectable()
export class TrailerService extends BaseService<Trailer> {
    constructor(repository: TrailerRepository) {
        super(repository);
    }
    public getMessage(object: Trailer): string {
        return `${super.getMessage(object)} Done by TrailerService`;
    }
}