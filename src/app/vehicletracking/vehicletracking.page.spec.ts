import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicletrackingPage } from './vehicletracking.page';

describe('VehicletrackingPage', () => {
  let component: VehicletrackingPage;
  let fixture: ComponentFixture<VehicletrackingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicletrackingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicletrackingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
