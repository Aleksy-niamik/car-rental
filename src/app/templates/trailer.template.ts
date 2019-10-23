export class TrailerTemplate {
    public getMaxOverloadStep(): number {
        return 50;
    }

    public getMaxOverload(): number {
        return 1000;
    }

    public getMinOverload(): number {
        return 50;
    }

    public getTiresCounts(): number[] {
        return [2,4];
    }
    
    public getPriceStep(): number {
        return 100;
    }

    public getMinPrice(): number {
        return 200;
    }

    public getMaxPrice(): number {
        return 6000;
    }
}