import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {
  newVehicleFormGroup: FormGroup;

  public id: string;
  constructor( private route: ActivatedRoute ) { }

  ngOnInit() {
    this.id = this.route.snapshot.queryParams['id'];
    this.createForm();
  }

  private createForm(): void {
    this.newVehicleFormGroup = new FormGroup({
      name: new FormControl(''),
      weight: new FormControl(''),
      licensePlate: new FormControl(''),
      passengersCount: new FormControl(''),
      yearOfProduction: new FormControl(''),
      travelledKilometers: new FormControl(''),
      engineCapacity: new FormControl(''),
      enginePowerInkW: new FormControl(''),
      brand: new FormControl('honda'),
      model: new FormControl('civic'),
      hookType: new FormControl(''),
      price: new FormControl('')
    });    
  }

}
