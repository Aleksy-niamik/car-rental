import { AsyncValidatorFn, AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { VehicleTemplate } from "../templates/vehicle.template";
import { map } from "rxjs/operators";
import { BusTemplate } from "../templates/bus.template";

export class CarFormValidators {

    private template: VehicleTemplate;

    constructor(_template: VehicleTemplate, private busTemplate: BusTemplate) {
        this.template = _template;
    }

    public setTemplate(_template) {
        this.template = _template;
    }
    
    public weightValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
        return of(control.value >= this.template.getMinWeight() && control.value <= this.template.getMaxWeight()).pipe( map( response => response ? null : {ranges: true} ) );
        };
    }

    public naturalValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
        return ( Number.isInteger(Number(control.value)) && Number(control.value) >= 0 ) ? null : {natural: true};
        };
    }

    public yearOfProductionValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
        return ( control.value >= this.template.getMinYearOfProduction() && control.value <= this.template.getMaxYearOfProduction() ) ? null : {ranges: true};
        };
    }
    
    public engineCapacityValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
        return of( control.value >= this.template.getMinEngineCapacity() && control.value <= this.template.getMaxEngineCapacity() ).pipe( map( response => response ? null : {ranges: true} ) );
        };
    }

    public enginePowerValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
        return of( control.value >= this.template.getMinEnginePower() && control.value <= this.template.getMaxEnginePower() ).pipe( map( response => response ? null : {ranges: true} ) );
        };
    }

    public priceValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
        return of( control.value >= this.template.getMinPrice() && control.value <= this.template.getMaxPrice() ).pipe( map( response => response ? null : {ranges: true} ) );
        };
    }

    public floorsCountValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
        return ( control.value >= this.busTemplate.getMinFloorsCount() && control.value <= this.busTemplate.getMaxFloorsCount() ) ? null : {ranges: true};
        };
    }

    public doorsCountValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
        return ( control.value >= this.busTemplate.getMinDoorsCount() && control.value <= this.busTemplate.getMaxDoorsCount() ) ? null : {ranges: true};
        };
    }
}