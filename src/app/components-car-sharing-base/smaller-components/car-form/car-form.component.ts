import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl, Validators, AsyncValidatorFn, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { VehicleRepository } from '../../../repositories/vehicle.repository';
import { Vehicle } from '../../../models/vehicle';
import { Bus } from '../../../models/vehicles/bus';
import { Utils } from '../../../utils/utils';
import { LendStatus } from '../../../models/enums/lend-status';
import { VehicleType } from '../../../models/enums/vehicle-type';
import { Motorcycle } from '../../../models/vehicles/motorcycle';
import { PassengerCar } from '../../../models/vehicles/passenger-car';
import { Truck } from '../../../models/vehicles/truck';
import { PassengerCarTemplate } from '../../../templates/passenger-car.template';
import { ControlType } from '../../../models/enums/control-type';
import { VehicleTemplate } from '../../../templates/vehicle.template';
import { BusTemplate } from '../../../templates/bus.template';
import { TruckTemplate } from '../../../templates/truck.template';
import { MotorcycleTemplate } from '../../../templates/motorcycle.template';
import { HookType } from '../../../models/enums/hook-type';
import { Brand } from '../../../models/brand';
import { of, timer, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {
  private newVehicleFormGroup: FormGroup;
  private beingEditedVehicle: Vehicle;
  private template: VehicleTemplate;
  private editing: boolean = false;

  private subControlsTable: Array<any>;
  private ControlType = ControlType;
  private VehicleType = VehicleType;
  private HookType = HookType;
  private Math = Math;
  private BusTemplate = BusTemplate;


  constructor( private route: ActivatedRoute, private vehicleRepository: VehicleRepository,
    private busTemplate: BusTemplate,
    private truckTemplate: TruckTemplate,
    private passengerCarTemplate: PassengerCarTemplate,
    private motorcycleTemplate: MotorcycleTemplate ) { 
    this.setSubControlstTable();
  }

  private setSubControlstTable(): void {
    this.subControlsTable = [['hasGPS'],['hasBedroom'],['floorsCount','doorsCount'],['hasTrunk']];
  }

  ngOnInit() {
    this.setFormMode();
    this.createForm();
  }

  private setFormMode(): void {
    let id = this.route.snapshot.queryParams['id'];
    if(!isNaN(id)) {
      let idx: number = Number(id);
      if(!isNaN(id) && Number.isInteger(Number(id)) && Number(id) >= 0 && Number(id) < this.vehicleRepository.getAll().length) {
        this.beingEditedVehicle = this.vehicleRepository.getElementById(Number(id));
        switch(this.beingEditedVehicle.vehicleType) {
          case VehicleType.Bus: this.template = this.busTemplate; break;
          case VehicleType.Truck: this.template = this.truckTemplate; break;
          case VehicleType.PassengerCar: this.template = this.passengerCarTemplate; break;
          case VehicleType.Motorcycle: this.template = this.motorcycleTemplate; break;
        }
        this.editing = true;
      }
    }
    if(!this.editing) {
      this.beingEditedVehicle = new Truck();
      this.editing = false;
      this.template = this.truckTemplate;
    }
  }

  private createForm(): void {
    this.newVehicleFormGroup = new FormGroup({
      name: new FormControl(this.beingEditedVehicle.name, Validators.required),
      vehicleType: new FormControl(this.editing ? this.beingEditedVehicle.vehicleType : VehicleType.Truck, Validators.required),
      weight: new FormControl(this.beingEditedVehicle.weight, Validators.required, this.weightValidator()),
      licensePlate: new FormControl(this.beingEditedVehicle.licensePlate, [ Validators.required, Validators.pattern('[A-Z]{3} [0-9A-Z]{5}') ]),
      passengersCount: new FormControl(this.template.getPassengersCounts().indexOf(this.beingEditedVehicle.passengersCount), Validators.required),
      yearOfProduction: new FormControl(this.beingEditedVehicle.yearOfProduction, [ Validators.required, this.nonNegativeIntegerValidator(), Validators.min(this.template.getMinYearOfProduction()), Validators.max(new Date().getFullYear()) ]),
      travelledKilometers: new FormControl(this.beingEditedVehicle.travelledKilometers, [ Validators.required, this.nonNegativeIntegerValidator() ]),
      engineCapacity: new FormControl(this.beingEditedVehicle.engineCapacity, Validators.required, this.engineCapacityValidator()),
      enginePowerInkW: new FormControl(this.beingEditedVehicle.enginePowerInkW, Validators.required, this.enginePowerValidator()),
      brand: new FormControl(this.editing ? this.template.getBrands().map(l => l.name).indexOf(this.beingEditedVehicle.brand) : 0, Validators.required),
      model: new FormControl(this.editing ? this.template.getBrands()[this.template.getBrands().map(l => l.name).indexOf(this.beingEditedVehicle.brand)].getModels().indexOf( this.beingEditedVehicle.model ) : 0, Validators.required),
      hookType: new FormControl(this.template.getHookTypes().indexOf(this.beingEditedVehicle.hookType), Validators.required),
      price: new FormControl(this.beingEditedVehicle.price, Validators.required, this.priceValidator())
    });
    if(!this.editing) this.setValues();
    this.onTypeChanged();
    this.newVehicleFormGroup.get('vehicleType').valueChanges.subscribe(l => this.onTypeChanged());
    this.newVehicleFormGroup.get('brand').valueChanges.subscribe(l => this.onBrandChanged());
  }

  private setValues(): void {
    this.newVehicleFormGroup.get('weight').setValue(
      (this.newVehicleFormGroup.get('vehicleType').value != this.beingEditedVehicle.vehicleType || !this.editing) ?
       this.template.getMinWeight() : this.beingEditedVehicle.weight);
    this.newVehicleFormGroup.get('yearOfProduction').setValue(
      (this.newVehicleFormGroup.get('vehicleType').value != this.beingEditedVehicle.vehicleType || !this.editing) ?
      this.template.getMinYearOfProduction() : this.beingEditedVehicle.yearOfProduction);
    this.newVehicleFormGroup.get('travelledKilometers').setValue(
      (this.newVehicleFormGroup.get('vehicleType').value != this.beingEditedVehicle.vehicleType || !this.editing) ?
      0 : this.beingEditedVehicle.travelledKilometers);
    this.newVehicleFormGroup.get('engineCapacity').setValue(
      (this.newVehicleFormGroup.get('vehicleType').value != this.beingEditedVehicle.vehicleType || !this.editing) ?
      this.template.getMinEngineCapacity() : this.beingEditedVehicle.engineCapacity);
    this.newVehicleFormGroup.get('enginePowerInkW').setValue(
      (this.newVehicleFormGroup.get('vehicleType').value != this.beingEditedVehicle.vehicleType || !this.editing) ?
      this.template.getMaxEnginePower() : this.beingEditedVehicle.enginePowerInkW);
    this.newVehicleFormGroup.get('price').setValue(
      (this.newVehicleFormGroup.get('vehicleType').value != this.beingEditedVehicle.vehicleType || !this.editing) ?
      this.template.getMinPrice() : this.beingEditedVehicle.price);
      if(Number(this.newVehicleFormGroup.get('vehicleType').value) == VehicleType.Bus) {
        this.newVehicleFormGroup.get('floorsCount').setValue(
          (Number(this.beingEditedVehicle.vehicleType) != VehicleType.Bus|| !this.editing) ?
          (<BusTemplate>this.template).getMinFloorsCount() : (<Bus>this.beingEditedVehicle).floorsCount);
        this.newVehicleFormGroup.get('doorsCount').setValue(
          (Number(this.beingEditedVehicle.vehicleType) != VehicleType.Bus|| !this.editing) ?
          (<BusTemplate>this.template).getMinDoorsCount() : (<Bus>this.beingEditedVehicle).doorsCount);
      }
  }

  private onSubmit() {
    if(this.editing) this.onEdit();
    else this.onCreate();
    console.table(this.vehicleRepository.getAll());
  }

  private onCreate() {
    let newVehicle: Vehicle = this.newVehicleFormGroup.getRawValue();
    newVehicle.id = Utils.getFreeId(this.vehicleRepository);
    newVehicle.lendStatus = LendStatus.ReadyToBorrow;
    this.vehicleRepository.add(newVehicle);
  }

  private onEdit() {
    let editedVehicle: Vehicle;
   // switch(Number(this.newVeh
    editedVehicle = this.newVehicleFormGroup.getRawValue();
    editedVehicle.vehicleType = Number(editedVehicle.vehicleType);
    editedVehicle.lendStatus = this.beingEditedVehicle.lendStatus;
    this.vehicleRepository.update(this.beingEditedVehicle, editedVehicle);
    this.beingEditedVehicle = editedVehicle;
  }

  private onTypeChanged() {
    let type: VehicleType = this.newVehicleFormGroup.get('vehicleType').value;

    for(let i=0; i<this.subControlsTable.length; i++) {
      if(i == type) continue;
      this.subControlsTable[i].forEach(l => this.newVehicleFormGroup.removeControl(l));
    }
    this.subControlsTable[type].forEach(l => this.newVehicleFormGroup.addControl(l, new FormControl()), Validators.required);
    switch(Number(type))
    {
      case VehicleType.Bus:
        this.template = this.busTemplate;
        this.newVehicleFormGroup.get('doorsCount').setValue(this.editing ? (<Bus>this.beingEditedVehicle).doorsCount : (<BusTemplate>this.template).getMinDoorsCount());
        this.newVehicleFormGroup.get('floorsCount').setValue(this.editing ? (<Bus>this.beingEditedVehicle).floorsCount : (<BusTemplate>this.template).getMinFloorsCount());
        this.newVehicleFormGroup.get('doorsCount').setValidators([Validators.required, this.nonNegativeIntegerValidator(), this.doorsCountValidator()]);
        this.newVehicleFormGroup.get('floorsCount').setValidators([Validators.required, this.nonNegativeIntegerValidator(), this.floorsCountValidator()]);
        break;
      case VehicleType.Truck:
          this.template = this.truckTemplate;
          this.newVehicleFormGroup.get('hasBedroom').setValue(this.editing ? (<Truck>this.beingEditedVehicle).hasBedroom : false);
      break;
      case VehicleType.PassengerCar:
          this.template = this.passengerCarTemplate;
          this.newVehicleFormGroup.get('hasGPS').setValue(this.editing ? (<PassengerCar>this.beingEditedVehicle).hasGPS : false);
      break;
      case VehicleType.Motorcycle:
          this.template = this.motorcycleTemplate;
          this.newVehicleFormGroup.get('hasTrunk').setValue(this.editing ? (<Motorcycle>this.beingEditedVehicle).hasTrunk : false);
      break;
    }
    this.setValues();
    if(this.newVehicleFormGroup.get('vehicleType').value != this.beingEditedVehicle.vehicleType || !this.editing) {
      this.newVehicleFormGroup.get('brand').setValue(0);
      this.newVehicleFormGroup.get('hookType').setValue(0);
      this.newVehicleFormGroup.get('passengersCount').setValue(0);
    }
    else {
      this.newVehicleFormGroup.get('brand').setValue(this.template.getBrands().map(l => l.name).indexOf(this.beingEditedVehicle.brand));
      this.newVehicleFormGroup.get('hookType').setValue(this.template.getHookTypes().indexOf(this.beingEditedVehicle.hookType));
      this.newVehicleFormGroup.get('passengersCount').setValue(this.template.getPassengersCounts().indexOf(this.beingEditedVehicle.passengersCount));
    }
  }

  private onBrandChanged(): void {
    let brand: Brand = this.template.getBrands()[this.newVehicleFormGroup.get('brand').value];
    if( this.editing && 
      this.newVehicleFormGroup.get('vehicleType').value == this.beingEditedVehicle.vehicleType && 
      brand.name == this.beingEditedVehicle.brand )
      this.newVehicleFormGroup.get('model').setValue(brand.getModels().indexOf(this.beingEditedVehicle.model));
    else this.newVehicleFormGroup.get('model').setValue(0);

  }

  private getType(): VehicleType {
    return this.newVehicleFormGroup.get('vehicleType').value;
  }

  private getEnumArray(enumm: any) {
    return Object.keys(enumm).filter(l => isNaN(Number(l)));
  }
  
  private getBrandsTable(): string[] {
    return this.template.getBrands().map(l => l.name);
  }

  private getModelsTable(): string[] {
   if( this.editing )
      return this.template.getBrands()[this.newVehicleFormGroup.get('brand').value].getModels();
    else return this.template.getBrands()[0].getModels();
  }

  private getHookTypesTable(): string[] {
    return this.template.getHookTypes().map(l => HookType[l]);
  }

  private weightValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return of(control.value >= this.template.getMinWeight() && control.value <= this.template.getMaxWeight()).pipe( map( response => response ? null : {errorBal: true} ) );
    };
  }

  private nonNegativeIntegerValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return ( Number.isInteger(Number(control.value)) && Number(control.value) >= 0 ) ? null : {errorBal: true};
    };
  }
  
  private engineCapacityValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return of( control.value >= this.template.getMinEngineCapacity() && control.value <= this.template.getMaxEngineCapacity() ).pipe( map( response => response ? null : {errorBal: true} ) );
    };
  }

  private enginePowerValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return of( control.value >= this.template.getMinEnginePower() && control.value <= this.template.getMaxEnginePower() ).pipe( map( response => response ? null : {errorBal: true} ) );
    };
  }

  private priceValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return of( control.value >= this.template.getMinPrice() && control.value <= this.template.getMaxPrice() ).pipe( map( response => response ? null : {errorBal: true} ) );
    };
  }

  private floorsCountValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return ( control.value >= this.busTemplate.getMinFloorsCount() && control.value <= this.busTemplate.getMaxFloorsCount() ) ? null : {errorBal: true};
    };
  }

  private doorsCountValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return ( control.value >= this.busTemplate.getMinDoorsCount() && control.value <= this.busTemplate.getMaxDoorsCount() ) ? null : {errorBal: true};
    };
  }
}
