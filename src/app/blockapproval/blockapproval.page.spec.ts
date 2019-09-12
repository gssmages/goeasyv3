import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockapprovalPage } from './blockapproval.page';

describe('BlockapprovalPage', () => {
  let component: BlockapprovalPage;
  let fixture: ComponentFixture<BlockapprovalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockapprovalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockapprovalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
