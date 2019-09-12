import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoshowPage } from './noshow.page';

describe('NoshowPage', () => {
  let component: NoshowPage;
  let fixture: ComponentFixture<NoshowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoshowPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoshowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
