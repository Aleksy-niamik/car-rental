import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components-car-sharing-base/home/home.component';
import { LoanHeaderComponent } from './components-car-sharing-base/loan-header/loan-header.component';
import { LoanFooterComponent } from './components-car-sharing-base/loan-footer/loan-footer.component';
import { NavBarComponent } from './components-car-sharing-base/nav-bar/nav-bar.component';
import { CarDetailsComponent } from './components-car-sharing-base/smaller-components/car-details/car-details.component';
import { CarFormComponent } from './components-car-sharing-base/smaller-components/car-form/car-form.component';
import { CarListComponent } from './components-car-sharing-base/smaller-components/car-list/car-list.component';
import { ClientDetailsComponent } from './components-car-sharing-base/smaller-components/client-details/client-details.component';
import { ClientFormComponent } from './components-car-sharing-base/smaller-components/client-form/client-form.component';
import { ClientListComponent } from './components-car-sharing-base/smaller-components/client-list/client-list.component';
import { DesktopComponent } from './components-car-sharing-base/smaller-components/desktop/desktop.component';
import { LoanDetailsComponent } from './components-car-sharing-base/smaller-components/loan-details/loan-details.component';
import { LoanFormComponent } from './components-car-sharing-base/smaller-components/loan-form/loan-form.component';
import { LoanListComponent } from './components-car-sharing-base/smaller-components/loan-list/loan-list.component';
import { DataTablesModule } from 'angular-datatables';


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
    LoanListComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    AppRoutingModule
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
      LoanListComponent
  ],
  providers: [
    
  ],
  bootstrap: [HomeComponent]
})

export class CarSharingBaseModule { }
