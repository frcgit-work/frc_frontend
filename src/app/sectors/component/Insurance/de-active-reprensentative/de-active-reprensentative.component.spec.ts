import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeActiveReprensentativeComponent } from './de-active-reprensentative.component';

describe('DeActiveReprensentativeComponent', () => {
  let component: DeActiveReprensentativeComponent;
  let fixture: ComponentFixture<DeActiveReprensentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeActiveReprensentativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeActiveReprensentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
