import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceBrokerComponent } from './insurance-broker.component';

describe('InsuranceBrokerComponent', () => {
  let component: InsuranceBrokerComponent;
  let fixture: ComponentFixture<InsuranceBrokerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceBrokerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceBrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
