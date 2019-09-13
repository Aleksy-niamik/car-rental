import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle';

@Component({
  selector: 'price-element',
  templateUrl: './price-element.component.html',
  styleUrls: ['./price-element.component.css']
})
export class PriceElementComponent implements OnInit {

  @Input()
  private displayedVehicle: Vehicle;
  
  constructor() { }

  ngOnInit() {
  }

}
