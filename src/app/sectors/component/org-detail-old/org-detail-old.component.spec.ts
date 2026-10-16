import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgDetailOldComponent } from './org-detail-old.component';

describe('OrgDetailOldComponent', () => {
  let component: OrgDetailOldComponent;
  let fixture: ComponentFixture<OrgDetailOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgDetailOldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgDetailOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
