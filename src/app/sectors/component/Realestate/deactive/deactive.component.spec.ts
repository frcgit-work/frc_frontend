import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactiveComponent } from './deactive.component';

describe('DeactiveComponent', () => {
  let component: DeactiveComponent;
  let fixture: ComponentFixture<DeactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
