import { HookType } from './enums/hook-type';
import { LendStatus } from './enums/lend-status';
import { ILendable } from '../interfaces/ILendable';
import { Entity } from './entity';

export class Trailer extends Entity implements ILendable {
  public maxOverload: number;
  public tiresCount: number;
  public hookType: HookType;

  public lendStatus: LendStatus;
  public price: number;
  public uniqueId: string;
  public getName(): string {
    return "przyczepa jakaś tam";
  }
}
