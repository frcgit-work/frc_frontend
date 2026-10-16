import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditCompanyComponent } from './audit-company.component';

describe('AuditCompanyComponent', () => {
  let component: AuditCompanyComponent;
  let fixture: ComponentFixture<AuditCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
