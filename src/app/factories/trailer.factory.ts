import { Trailer } from '../models/trailer';
import { Utils } from '../utils/utils';
import { HookType } from '../models/enums/hook-type';
import { LendStatus } from '../models/enums/lend-status';
import { Injectable } from '@angular/core';
import { EntityFactory } from './entity.factory';
import { TrailerRepository } from '../repositories/trailer.repository';
import { TrailerTemplate } from '../templates/trailer.template';

@Injectable()
export class TrailerFactory extends EntityFactory{

    constructor(private trailerRepository: TrailerRepository, private trailerTemplate: TrailerTemplate) {
        super(trailerRepository);
    }

    public create(): Trailer {
        let trailer = new Trailer();
        this.giveId(trailer);
        trailer.hookType = Utils.getRandomDigit(HookType.Light, HookType.HeavyTruck);
        trailer.maxOverload = Utils.getRandomDigitExtra(
            this.trailerTemplate.getMaxOverloadStep(), 
            this.trailerTemplate.getMinOverload(),
            this.trailerTemplate.getMaxOverload() );
        trailer.tiresCount = this.trailerTemplate.getTiresCounts()[ 
            Utils.getRandomDigit(0, this.trailerTemplate.getTiresCounts().length - 1) ];

        trailer.lendStatus = LendStatus.ReadyToBorrow;
        trailer.price = Utils.getRandomDigitExtra(
            this.trailerTemplate.getPriceStep(),
            this.trailerTemplate.getMinPrice(),
            this.trailerTemplate.getMaxPrice() );

        return trailer;
    }
}