import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceActuarianComponent } from './insurance-actuarian.component';

describe('InsuranceActuarianComponent', () => {
  let component: InsuranceActuarianComponent;
  let fixture: ComponentFixture<InsuranceActuarianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceActuarianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceActuarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
