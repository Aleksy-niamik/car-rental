import { Utils } from '../utils/utils';

export class Brand {
    public readonly name: string;
    private models: string[];

    constructor(_name: string, _models:string[]) {
        this.name = _name;
        this.models = _models;
    }

    public getModels(): string[] {
        return this.models;
    }

    public getRandomModel(): string {
        return this.models[Utils.getRandomDigit(0, this.models.length - 1)];
    }
}