import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";
import { VehicleTemplate } from "../templates/vehicle.template";
import { BusTemplate } from "../templates/bus.template";
import { VehicleRepository } from "../repositories/vehicle.repository";
import { Utils } from "../utils/utils";
import { Vehicle } from "../models/vehicle";

export class CarFormValidators {

    private template: VehicleTemplate;
    private beingEditedVehicle: Vehicle

    constructor(_beingEditedVehicle: Vehicle, _template: VehicleTemplate, private busTemplate: BusTemplate, private vehicleRepository: VehicleRepository) {
        this.template = _template;
        this.beingEditedVehicle = _beingEditedVehicle;
    }

    public setTemplate(_template) {
        this.template = _template;
    }
    
    public weightValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
        return (control.value >= this.template.getMinWeight() && control.value <= this.template.getMaxWeight()) ? null : {ranges: true};
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
    
    public engineCapacityValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
        return ( control.value >= this.template.getMinEngineCapacity() && control.value <= this.template.getMaxEngineCapacity() ) ? null : {ranges: true};
        };
    }

    public enginePowerValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
        return ( control.value >= this.template.getMinEnginePower() && control.value <= this.template.getMaxEnginePower() ) ? null : {ranges: true};
        };
    }

    public priceValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
        return ( control.value >= this.template.getMinPrice() && control.value <= this.template.getMaxPrice() ) ? null : {ranges: true};
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

    public uniqueIdValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return ( this.vehicleRepository.getAll().filter(l => l.id != this.beingEditedVehicle.id && l.uniqueId == (Utils.getPreInfo(Number(control.get('vehicleType').value)) + control.get('uniqueId').value)).length == 0 ) ? null : {uniqueId: true};
            };
        }
}