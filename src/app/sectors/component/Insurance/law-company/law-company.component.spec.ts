import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawCompanyComponent } from './law-company.component';

describe('LawCompanyComponent', () => {
  let component: LawCompanyComponent;
  let fixture: ComponentFixture<LawCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
