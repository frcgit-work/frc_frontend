import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaabComponent } from './haab.component';

describe('HaabComponent', () => {
  let component: HaabComponent;
  let fixture: ComponentFixture<HaabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HaabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
