import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageAssesorComponent } from './damage-assesor.component';

describe('DamageAssesorComponent', () => {
  let component: DamageAssesorComponent;
  let fixture: ComponentFixture<DamageAssesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamageAssesorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageAssesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
