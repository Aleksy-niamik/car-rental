import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerListContainerComponent } from './trailer-list-container.component';

describe('TrailerListContainerComponent', () => {
  let component: TrailerListContainerComponent;
  let fixture: ComponentFixture<TrailerListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailerListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailerListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
