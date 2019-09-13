import { Component, OnInit, Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { VehicleType } from 'src/app/models/enums/vehicle-type';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleRepository } from 'src/app/repositories/vehicle.repository';
import { Utils } from 'src/app/utils/utils';
import { LendStatus } from 'src/app/models/enums/lend-status';

@Injectable()
@Component({
  selector: 'car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  private dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<void> = new Subject<void>();
  public vehicles: Vehicle[];

  public selectedVehicle: Vehicle;

  @Output()
  public onVehicleSelected = new EventEmitter<Vehicle>();
  
  constructor( private vehicleRepository: VehicleRepository) {  }

  ngOnInit() {
    this.initTable();   
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  public getVehicleType(type: VehicleType): string {
    return Utils.translateVehicleType(type);
  }

  public getLendStatus(type: LendStatus): string {
    return Utils.translateLendStatus(type);
  }
  
  private onRowClicked(data: Vehicle): void {
    this.onVehicleSelected.emit(data);
    this.selectedVehicle = data;
  }
  private async initTable(): Promise<void> {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.vehicles = await this.vehicleRepository.getAll();
    this.dtTrigger.next();
  }

}
