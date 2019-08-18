import { INameable } from '../interfaces/INameable';

export abstract class Repository<T> implements INameable{
    protected items: T[] = [];
    
    public getAll(): T[] {
        return this.items;
    }

    public add(item: T): void {
        this.items.push(item);
    }

    public delete(item: T): T {
         this.items.splice(this.items.indexOf(item),1);
         return item;
    }

    public abstract getName(): string;
}