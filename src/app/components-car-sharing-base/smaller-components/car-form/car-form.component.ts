import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
import { CarFormValidators } from '../../../controllers/car-form-validators';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {
  private newVehicleFormGroup: FormGroup;
  private beingEditedVehicle: Vehicle;
  private template: VehicleTemplate;
  private validators: CarFormValidators;
  private editing: boolean = false;
  private preInfo: string;

  private subControlsTable: Array<any>;
  private ControlType = ControlType;
  private VehicleType = VehicleType;
  private HookType = HookType;
  private Math = Math;
  private BusTemplate = BusTemplate;
  private LendStatus = LendStatus;


  constructor( private route: ActivatedRoute, private vehicleRepository: VehicleRepository,
    private busTemplate: BusTemplate,
    private truckTemplate: TruckTemplate,
    private passengerCarTemplate: PassengerCarTemplate,
    private motorcycleTemplate: MotorcycleTemplate ) { 
    this.setSubControlstTable();
    this.validators = new CarFormValidators(this.template, this.busTemplate);
  }

  private setSubControlstTable(): void {
    this.subControlsTable = [['hasGPS'],['hasBedroom'],['floorsCount','doorsCount'],['hasTrunk']];
  }

  ngOnInit() {
    this.setFormMode();
    this.createForm();
    if(this.editing && this.beingEditedVehicle.lendStatus != LendStatus.ReadyToBorrow) this.newVehicleFormGroup.disable();
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

    this.validators.setTemplate(this.template);
  }

  private createForm(): void {
    this.newVehicleFormGroup = new FormGroup({
      name: new FormControl(this.beingEditedVehicle.name, Validators.required),
      vehicleType: new FormControl(this.editing ? this.beingEditedVehicle.vehicleType : VehicleType.Truck, Validators.required),
      weight: new FormControl(this.beingEditedVehicle.weight, Validators.required, this.validators.weightValidator()),
      licensePlate: new FormControl(this.beingEditedVehicle.licensePlate, [ Validators.required, Validators.pattern('[A-Z]{3} [0-9A-Z]{5}') ]),
      passengersCount: new FormControl(this.template.getPassengersCounts().indexOf(this.beingEditedVehicle.passengersCount), Validators.required),
      yearOfProduction: new FormControl(this.beingEditedVehicle.yearOfProduction, [ Validators.required, this.validators.yearOfProductionValidator(), this.validators.naturalValidator() ]),
      travelledKilometers: new FormControl(this.beingEditedVehicle.travelledKilometers, [ Validators.required, this.validators.naturalValidator() ]),
      engineCapacity: new FormControl(this.beingEditedVehicle.engineCapacity, Validators.required, this.validators.engineCapacityValidator()),
      enginePowerInkW: new FormControl(this.beingEditedVehicle.enginePowerInkW, Validators.required, this.validators.enginePowerValidator()),
      brand: new FormControl(this.editing ? this.template.getBrands().map(l => l.name).indexOf(this.beingEditedVehicle.brand) : 0, Validators.required),
      model: new FormControl(this.editing ? this.template.getBrands()[this.template.getBrands().map(l => l.name).indexOf(this.beingEditedVehicle.brand)].getModels().indexOf( this.beingEditedVehicle.model ) : 0, Validators.required),
      hookType: new FormControl(this.template.getHookTypes().indexOf(this.beingEditedVehicle.hookType), Validators.required),
      price: new FormControl(this.beingEditedVehicle.price, Validators.required, this.validators.priceValidator()),
      uniqueId: new FormControl('')
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
      this.template.getMinEnginePower() : this.beingEditedVehicle.enginePowerInkW);
    this.newVehicleFormGroup.get('uniqueId').setValue(
      (this.newVehicleFormGroup.get('vehicleType').value != this.beingEditedVehicle.vehicleType || !this.editing) ?
      '' : this.beingEditedVehicle.uniqueId.substr(4));
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
    let vehicle: Vehicle = this.newVehicleFormGroup.getRawValue();
    vehicle.vehicleType = Number(vehicle.vehicleType);
    vehicle.model = this.template.getBrands()[vehicle.brand].getModels()[vehicle.model];
    vehicle.brand = this.template.getBrands()[vehicle.brand].name;
    vehicle.hookType = this.template.getHookTypes()[vehicle.hookType];
    vehicle.passengersCount = this.template.getPassengersCounts()[vehicle.passengersCount];
    vehicle.lendStatus = LendStatus.ReadyToBorrow;
    if(!this.editing) {
      vehicle.id = Utils.getFreeId(this.vehicleRepository);
      this.vehicleRepository.add(vehicle);
    }
    else {
      vehicle.id = this.beingEditedVehicle.id;
      this.vehicleRepository.update(this.beingEditedVehicle, vehicle);
      this.beingEditedVehicle = vehicle;
    }
    console.table(this.vehicleRepository.getAll());
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
        this.newVehicleFormGroup.get('doorsCount').setValue((this.editing && Number(this.newVehicleFormGroup.get('vehicleType').value) == this.beingEditedVehicle.vehicleType) ? (<Bus>this.beingEditedVehicle).doorsCount : (<BusTemplate>this.template).getMinDoorsCount());
        this.newVehicleFormGroup.get('floorsCount').setValue((this.editing && Number(this.newVehicleFormGroup.get('vehicleType').value) == this.beingEditedVehicle.vehicleType) ? (<Bus>this.beingEditedVehicle).floorsCount : (<BusTemplate>this.template).getMinFloorsCount());
        this.newVehicleFormGroup.get('doorsCount').setValidators([ Validators.required, this.validators.naturalValidator(), this.validators.doorsCountValidator()]);
        this.newVehicleFormGroup.get('floorsCount').setValidators([ Validators.required, this.validators.naturalValidator(), this.validators.floorsCountValidator()]);
      break;
      case VehicleType.Truck:
          this.template = this.truckTemplate;
          this.newVehicleFormGroup.get('hasBedroom').setValue((this.editing && Number(this.newVehicleFormGroup.get('vehicleType').value) == this.beingEditedVehicle.vehicleType) ? (<Truck>this.beingEditedVehicle).hasBedroom : false);
      break;
      case VehicleType.PassengerCar:
          this.template = this.passengerCarTemplate;
          this.newVehicleFormGroup.get('hasGPS').setValue((this.editing && Number(this.newVehicleFormGroup.get('vehicleType').value) == this.beingEditedVehicle.vehicleType) ? (<PassengerCar>this.beingEditedVehicle).hasGPS : false);
      break;
      case VehicleType.Motorcycle:
          this.template = this.motorcycleTemplate;
          this.newVehicleFormGroup.get('hasTrunk').setValue((this.editing && Number(this.newVehicleFormGroup.get('vehicleType').value) == this.beingEditedVehicle.vehicleType) ? (<Motorcycle>this.beingEditedVehicle).hasTrunk : false);
      break;
    }
    this.validators.setTemplate(this.template);
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

  private getPreInfo(): string {
    switch(Number(this.newVehicleFormGroup.get('vehicleType').value)) {
      case VehicleType.Bus: return "BUS_"; 
      case VehicleType.PassengerCar: return "OSO_";
      case VehicleType.Truck: return "CIE_";
      case VehicleType.Motorcycle: return "MOT_";
    }
  }

  private getModelsTable(): string[] {
   if( this.editing )
      return this.template.getBrands()[this.newVehicleFormGroup.get('brand').value].getModels();
    else return this.template.getBrands()[0].getModels();
  }

  private getHookTypesTable(): string[] {
    return this.template.getHookTypes().map(l => HookType[l]);
  }
}
