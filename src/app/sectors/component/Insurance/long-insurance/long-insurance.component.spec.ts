import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongInsuranceComponent } from './long-insurance.component';

describe('LongInsuranceComponent', () => {
  let component: LongInsuranceComponent;
  let fixture: ComponentFixture<LongInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongInsuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LongInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
