import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlType } from '../../../../models/enums/control-type';
import { VehicleTemplate } from '../../../../templates/vehicle.template';

@Component({
  selector: 'form-control-div',
  templateUrl: './form-control-div.component.html',
  styleUrls: ['./form-control-div.component.css']
})
export class FormControlDivComponent implements OnInit {

  @Input() newVehicleFormGroup: FormGroup;
  @Input() controlName: string;
  @Input() controlType?: ControlType;
  @Input() selectArray?: string[];
  @Input() min?: string;
  @Input() max?: string; 
  @Input() info?: string;
  @Input() preInfo?: string;
  @Input() required?: boolean;
  @Input() width?: string;

  private ControlType = ControlType;
  constructor() { }

  ngOnInit() {
    if(this.controlType === undefined) this.controlType = ControlType.Text;
    if(this.required === undefined) this.required = true;
    if(this.width === undefined) this.width = 'initial';
  }


}
