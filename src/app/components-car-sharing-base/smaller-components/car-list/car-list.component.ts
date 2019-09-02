import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { VehicleType } from 'src/app/models/enums/vehicle-type';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { VehicleRepository } from 'src/app/repositories/vehicle.repository';

@Injectable()
@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  private dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<void> = new Subject<void>();
  //public dtInstance: DataTables.Api;
  public vehicles: Vehicle[];

  //@ViewChild( DataTableDirective, {static: false})
  //dataTableElement: DataTableDirective;
  
  constructor( private vehicleRepository: VehicleRepository) {  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.vehicles = this.vehicleRepository.getAll();
    
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  private setTableOptions(): void {
    let options: DataTables.Settings = {};
    options.columns = [
            { name: "name", title: "Name", data: "name" },
            { name: "type", title: "Type", data: "type", render: (data, type, row, meta) => VehicleType[data] },
            { name: "weight", title: "Weight", data: "weight" }
        ];
    options.rowCallback = (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
            self.onRowClicked(data as Vehicle);
        });
        return row;
        }
    this.dtOptions = options;

  }
  private onRowClicked(data: Vehicle): void {
    //this.router.navigate(["/boat-form"], { queryParams: { id: data.id } });
}
private async initTable(): Promise<void> {
  this.setTableOptions();
  this.dtOptions.data = this.vehicleRepository.getAll();

  //this.dataTableElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //  dtInstance.destroy();
   // this.dtTrigger.next();
  //});
  //this.dtInstance = await this.dataTableElement.dtInstance;
  //this.dtTrigger.next();
}

}
