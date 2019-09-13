import { Component, OnInit, Injectable, Input } from '@angular/core';
import { VehicleRepository } from 'src/app/repositories/vehicle.repository';
import { Vehicle } from 'src/app/models/vehicle';

@Injectable()
@Component({
  selector: 'price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  private vehicles: Vehicle[];
  
  constructor(private vehicleRepository: VehicleRepository) { }

  ngOnInit() {
    this.vehicles = this.vehicleRepository.getOrderedByPriceDescending();
  }

}
