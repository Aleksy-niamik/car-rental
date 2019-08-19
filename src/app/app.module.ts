import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { CarSharingBaseModule } from './car-sharing-base.module';
import { AppComponent } from './app.component';

import { DesktopComponent } from './components-car-sharing-base/smaller-components/desktop/desktop.component';
import { ClientListComponent } from './components-car-sharing-base/smaller-components/client-list/client-list.component';
import { LoanFormComponent } from './components-car-sharing-base/smaller-components/loan-form/loan-form.component';
import { LoanListComponent } from './components-car-sharing-base/smaller-components/loan-list/loan-list.component';
import { CarListComponent } from './components-car-sharing-base/smaller-components/car-list/car-list.component';
import { VehicleRepository } from './repositories/vehicle.repository';
import { TrailerRepository } from './repositories/trailer.repository';
import { Seed } from './seed/seed-data';
import { LoggerService } from './services/logger.service';
import { LendService } from './services/lend.service';
import { BusFactory } from './factories/bus.factory';
import { MotorcycleFactory } from './factories/motorcycle.factory';
import { PassengerCarFactory } from './factories/passenger-car.factory';
import { TruckFactory } from './factories/truck.factory';
import { TrailerFactory } from './factories/trailer.factory';
import { FinishLendService } from './services/finish-lend';
import { VehicleService } from './services/vehicle.service';
import { TrailerService } from './services/trailer.service';



const APP_ROUTES: Routes = [
  { path: 'client-list',   component: ClientListComponent},
  { path: 'desktop',    component: DesktopComponent},
  { path: 'car-list',    component: CarListComponent},
  { path: 'loan-list',    component: LoanListComponent},
  { path: 'loan-form',    component: LoanFormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarSharingBaseModule,
    RouterModule.forRoot( APP_ROUTES )
  ],
  providers: [
    {provide: BusFactory, useClass: BusFactory},
    {provide: MotorcycleFactory, useClass: MotorcycleFactory},
    {provide: PassengerCarFactory, useClass: PassengerCarFactory},
    {provide: TruckFactory, useClass: TruckFactory},
    {provide: TrailerFactory, useClass: TrailerFactory},
    {provide: Seed, useClass: Seed},
    {provide: VehicleRepository, useClass: VehicleRepository},
    {provide: TrailerRepository, useClass: TrailerRepository},
    {provide: LendService, useClass: LendService},
    {provide: FinishLendService, useClass: FinishLendService},
    {provide: VehicleService, useClass: VehicleService},
    {provide: TrailerService, useClass: TrailerService}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
