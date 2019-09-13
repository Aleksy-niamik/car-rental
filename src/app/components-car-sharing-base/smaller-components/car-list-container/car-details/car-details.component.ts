import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle';
import { Utils } from 'src/app/utils/utils';
import { VehicleType } from 'src/app/models/enums/vehicle-type';
import { LendStatus } from 'src/app/models/enums/lend-status';

@Component({
  selector: 'car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})

export class CarDetailsComponent implements OnInit {
  public vehicleType = VehicleType;
  
  @Input()
  public displayedVehicle: Vehicle;

  @Output()
  public onClose: EventEmitter<void> = new EventEmitter<void>();
  
  constructor() {}

  ngOnInit() {
  }

  async ngAfterViewInit() {
    await $('.table').animate({'width': '60%'}, 60, 'linear').promise();
    $('.details').animate({'right': '0%'}, 430, 'linear');
  }

  public getVehicleType(type: VehicleType): string {
    return Utils.translateVehicleType(type);
  }

  public getLendStatus(type: LendStatus): string {
    return Utils.translateLendStatus(type);
  }
  
  private async close(): Promise<void> {
    $('.table').animate({'width': '94%'}, 140, 'linear').promise();    
    await $('.details').animate({'right': '-33%'}, 430, 'linear').promise();
    this.onClose.emit();
    return new Promise<void>( (resolve, reject) => {});
  }

}
