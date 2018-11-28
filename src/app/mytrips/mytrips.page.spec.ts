import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MytripsPage } from './mytrips.page';

describe('MytripsPage', () => {
  let component: MytripsPage;
  let fixture: ComponentFixture<MytripsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MytripsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MytripsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
