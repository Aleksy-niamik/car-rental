import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerCarDetailsComponent } from './passenger-car-details.component';

describe('PassengerCarDetailsComponent', () => {
  let component: PassengerCarDetailsComponent;
  let fixture: ComponentFixture<PassengerCarDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerCarDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerCarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
