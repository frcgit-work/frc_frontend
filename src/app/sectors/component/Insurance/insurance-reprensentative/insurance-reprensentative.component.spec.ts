import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceReprensentativeComponent } from './insurance-reprensentative.component';

describe('InsuranceReprensentativeComponent', () => {
  let component: InsuranceReprensentativeComponent;
  let fixture: ComponentFixture<InsuranceReprensentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceReprensentativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceReprensentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
