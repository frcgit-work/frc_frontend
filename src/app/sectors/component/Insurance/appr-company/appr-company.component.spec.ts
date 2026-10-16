import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprCompanyComponent } from './appr-company.component';

describe('ApprCompanyComponent', () => {
  let component: ApprCompanyComponent;
  let fixture: ComponentFixture<ApprCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
