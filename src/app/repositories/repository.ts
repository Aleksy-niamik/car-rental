import { INameable } from '../interfaces/INameable';
import { Entity } from '../models/entity';

export abstract class Repository<T extends Entity> implements INameable{
    protected items: T[] = [];
    
    public getAll(): T[] {
        return this.items;
    }

    public getElementById(id: number): T {
        return this.items.filter(l => l.id == id)[0];
    }

    public add(item: T): void {
        this.items.push(item);
    }

    public delete(item: T): T {
         this.items.splice(this.items.indexOf(item),1);
         return item;
    }

    public update(oldItem: T, newItem: T): void {
        let id = oldItem.id;
        this.items.splice(this.items.indexOf(oldItem),1,newItem);
        newItem.id = id;
    }

    public abstract getName(): string;
}