import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceltripsPage } from './canceltrips.page';

describe('CanceltripsPage', () => {
  let component: CanceltripsPage;
  let fixture: ComponentFixture<CanceltripsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanceltripsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanceltripsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
