import { IfStmt } from '@angular/compiler';

export class Utils {
    public static getRandomDigit(from: number,to: number): number{
        return Math.floor(Math.random() * (to - from + 1)) + from;
    }

    public static getRandomDigitExtra(step: number, from: number,to: number): number{
        if(from > to ){
            let buf: number = to;
            to = from;
            from = buf;
        }
        if(step <= 0) throw Error("Ujemny skok");
        if(from/step - Math.floor(from/step) != 0) from += step - (from/step - Math.floor(from/step)) * step;
        to -= (to/step - Math.floor(to/step)) * step;
        let numberOfSteps: number = Math.floor((to - from) / step);
        let result: number = this.getRandomDigit(0,numberOfSteps) * step + from;
        let precision: number = 0;
        while(true) {
            if(step*Math.pow(10, precision) == Math.floor(step*Math.pow(10, precision))) break;
            else precision++;
        }
        return Math.floor(result * Math.pow(10, precision)) / Math.pow(10, precision);
    }

}