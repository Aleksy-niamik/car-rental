import { Repository } from './repository';
import { Trailer } from '../models/trailer';
import { HookType } from '../models/enums/hook-type';

export class TrailerRepository extends Repository<Trailer> {
    public getByHookType(type: HookType): Trailer[] {
        return this.items.filter(s => s.hookType == type);
    }

    public getName(): string {
        return 'trailer repository';
    }
}