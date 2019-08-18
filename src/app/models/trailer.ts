import { HookType } from './enums/hook-type';
import { LendStatus } from './enums/lend-status';
import { ILendable } from '../interfaces/ILendable';

export class Trailer implements ILendable {
  public maxOverload: number;
  public tiresCount: number;
  public hookType: HookType;

  public lendStatus: LendStatus;
  public getName(): string {
    return "przyczepa jakaś tam";
  }
}
