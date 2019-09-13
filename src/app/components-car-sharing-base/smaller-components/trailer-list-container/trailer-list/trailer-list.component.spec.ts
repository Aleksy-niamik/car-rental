import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerListComponent } from './trailer-list.component';

describe('TrailerListComponent', () => {
  let component: TrailerListComponent;
  let fixture: ComponentFixture<TrailerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
