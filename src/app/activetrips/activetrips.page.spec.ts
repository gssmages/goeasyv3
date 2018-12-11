import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivetripsPage } from './activetrips.page';

describe('ActivetripsPage', () => {
  let component: ActivetripsPage;
  let fixture: ComponentFixture<ActivetripsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivetripsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivetripsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
