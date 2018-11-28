import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyapprvaldashboardPage } from './myapprvaldashboard.page';

describe('MyapprvaldashboardPage', () => {
  let component: MyapprvaldashboardPage;
  let fixture: ComponentFixture<MyapprvaldashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyapprvaldashboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyapprvaldashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
