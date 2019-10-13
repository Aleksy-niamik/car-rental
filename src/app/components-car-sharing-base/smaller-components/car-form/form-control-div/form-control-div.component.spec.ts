import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlDivComponent } from './form-control-div.component';

describe('FormControlDivComponent', () => {
  let component: FormControlDivComponent;
  let fixture: ComponentFixture<FormControlDivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlDivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
