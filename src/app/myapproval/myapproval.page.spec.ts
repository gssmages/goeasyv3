import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyapprovalPage } from './myapproval.page';

describe('MyapprovalPage', () => {
  let component: MyapprovalPage;
  let fixture: ComponentFixture<MyapprovalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyapprovalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyapprovalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
