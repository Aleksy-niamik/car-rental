import { Trailer } from '../models/trailer';
import { Utils } from '../utils/utils';
import { HookType } from '../models/enums/hook-type';
import { LendStatus } from '../models/enums/lend-status';
import { Injectable } from '@angular/core';
import { EntityFactory } from './entity.factory';
import { TrailerRepository } from '../repositories/trailer.repository';

@Injectable()
export class TrailerFactory extends EntityFactory{

    constructor(private trailerRepository: TrailerRepository) {
        super(trailerRepository);
    }

    public create(): Trailer {
        let trailer = new Trailer();
        this.giveId(trailer);
        trailer.hookType = Utils.getRandomDigit(HookType.Light, HookType.HeavyTruck);
        trailer.maxOverload = Utils.getRandomDigitExtra(50, 50, 1000);
        trailer.tiresCount = Utils.getRandomDigitExtra(2,2,4);

        trailer.lendStatus = LendStatus.ReadyToBorrow;
        trailer.price = Utils.getRandomDigitExtra(100,200,6000);

        return trailer;
    }
}