import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HozComponent } from './hoz.component';

describe('HozComponent', () => {
  let component: HozComponent;
  let fixture: ComponentFixture<HozComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HozComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HozComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
