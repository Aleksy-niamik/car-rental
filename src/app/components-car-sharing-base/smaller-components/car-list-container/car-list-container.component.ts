import { Component, OnInit, ViewChild } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleType } from 'src/app/models/enums/vehicle-type';
import { CarListComponent } from './car-list/car-list.component';

@Component({
  selector: 'car-list-container',
  templateUrl: './car-list-container.component.html',
  styleUrls: ['./car-list-container.component.css']
})
export class CarListContainerComponent implements OnInit {

  public vehicleType = VehicleType;
  public selectedVehicle: Vehicle;
  public classes: any;
  
  @ViewChild(CarListComponent, {static: false})
  public carListComponent: CarListComponent;

  constructor() {}

  ngOnInit() {
  }

  public vehicleSelected(data: Vehicle): void {
      this.selectedVehicle = data;
      this.classes = {
        'passenger-car': this.selectedVehicle.vehicleType == VehicleType.PassengerCar,
        'bus': this.selectedVehicle.vehicleType == VehicleType.Bus,
        'motorcycle': this.selectedVehicle.vehicleType == VehicleType.Motorcycle,
        'truck': this.selectedVehicle.vehicleType == VehicleType.Truck
      };
  }

  private close(): void {
    this.carListComponent.selectedVehicle = undefined;
    this.selectedVehicle = undefined;    
  }
}
