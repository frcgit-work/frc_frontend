import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HbutsComponent } from './hbuts.component';

describe('HbutsComponent', () => {
  let component: HbutsComponent;
  let fixture: ComponentFixture<HbutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HbutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HbutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
