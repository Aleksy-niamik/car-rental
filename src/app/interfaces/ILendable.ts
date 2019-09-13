import { LendStatus } from '../models/enums/lend-status';
import { INameable } from './INameable';

export interface ILendable extends INameable{
    lendStatus: LendStatus;
    price: number;
}