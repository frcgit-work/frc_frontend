import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiuComponent } from './hiu.component';

describe('HiuComponent', () => {
  let component: HiuComponent;
  let fixture: ComponentFixture<HiuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
