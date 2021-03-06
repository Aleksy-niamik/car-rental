import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components-car-sharing-base/home/home.component';
import { LoanHeaderComponent } from './components-car-sharing-base/loan-header/loan-header.component';
import { LoanFooterComponent } from './components-car-sharing-base/loan-footer/loan-footer.component';
import { NavBarComponent } from './components-car-sharing-base/nav-bar/nav-bar.component';
import { CarDetailsComponent } from './components-car-sharing-base/smaller-components/car-list-container/car-details/car-details.component';
import { CarFormComponent } from './components-car-sharing-base/smaller-components/car-form/car-form.component';
import { CarListComponent } from './components-car-sharing-base/smaller-components/car-list-container/car-list/car-list.component';
import { ClientDetailsComponent } from './components-car-sharing-base/smaller-components/client-details/client-details.component';
import { ClientFormComponent } from './components-car-sharing-base/smaller-components/client-form/client-form.component';
import { ClientListComponent } from './components-car-sharing-base/smaller-components/client-list/client-list.component';
import { DesktopComponent } from './components-car-sharing-base/smaller-components/desktop/desktop.component';
import { LoanDetailsComponent } from './components-car-sharing-base/smaller-components/loan-details/loan-details.component';
import { LoanFormComponent } from './components-car-sharing-base/smaller-components/loan-form/loan-form.component';
import { LoanListComponent } from './components-car-sharing-base/smaller-components/loan-list/loan-list.component';
import { DataTablesModule } from 'angular-datatables';
import { CarListContainerComponent } from './components-car-sharing-base/smaller-components/car-list-container/car-list-container.component';
import { BusDetailsComponent } from './components-car-sharing-base/smaller-components/car-list-container/car-details/bus-details/bus-details.component';
import { TruckDetailsComponent } from './components-car-sharing-base/smaller-components/car-list-container/car-details/truck-details/truck-details.component';
import { MotorcycleDetailsComponent } from './components-car-sharing-base/smaller-components/car-list-container/car-details/motorcycle-details/motorcycle-details.component';
import { PassengerCarDetailsComponent } from './components-car-sharing-base/smaller-components/car-list-container/car-details/passenger-car-details/passenger-car-details.component';
import { TrailerListContainerComponent } from './components-car-sharing-base/smaller-components/trailer-list-container/trailer-list-container.component';
import { TrailerDetailsComponent } from './components-car-sharing-base/smaller-components/trailer-list-container/trailer-details/trailer-details.component';
import { TrailerListComponent } from './components-car-sharing-base/smaller-components/trailer-list-container/trailer-list/trailer-list.component';
import { PriceListComponent } from './components-car-sharing-base/smaller-components/price-list/price-list.component';
import { PriceElementComponent } from './components-car-sharing-base/smaller-components/price-list/price-element/price-element.component';
import { FormControlDivComponent } from './components-car-sharing-base/smaller-components/car-form/form-control-div/form-control-div.component';



@NgModule({
  declarations: [
    HomeComponent,
    LoanFooterComponent,
    LoanHeaderComponent,
    NavBarComponent,
    CarDetailsComponent,
    CarFormComponent,
    CarListComponent,
    ClientDetailsComponent,
    ClientFormComponent,
    ClientListComponent,
    DesktopComponent,
    LoanDetailsComponent,
    LoanFormComponent,
    LoanListComponent,
    CarListContainerComponent,
    BusDetailsComponent,
    TruckDetailsComponent,
    MotorcycleDetailsComponent,
    PassengerCarDetailsComponent,
    TrailerListContainerComponent,
    TrailerListComponent,
    TrailerDetailsComponent,
    PriceListComponent,
    PriceElementComponent,
    FormControlDivComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
      HomeComponent,
      LoanFooterComponent,
      LoanHeaderComponent,
      NavBarComponent,
      CarDetailsComponent,
      CarFormComponent,
      CarListComponent,
      ClientDetailsComponent,
      ClientFormComponent,
      ClientListComponent,
      DesktopComponent,
      LoanDetailsComponent,
      LoanFormComponent,
      LoanListComponent,
      PriceListComponent
  ],
  providers: [
    
  ],
  bootstrap: [HomeComponent]
})

export class CarSharingBaseModule { }
