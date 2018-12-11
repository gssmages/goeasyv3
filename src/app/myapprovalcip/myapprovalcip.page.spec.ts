import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyapprovalcipPage } from './myapprovalcip.page';

describe('MyapprovalcipPage', () => {
  let component: MyapprovalcipPage;
  let fixture: ComponentFixture<MyapprovalcipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyapprovalcipPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyapprovalcipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
