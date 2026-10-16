import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ENoticeComponent } from './enotice.component';

describe('ENoticeComponent', () => {
  let component: ENoticeComponent;
  let fixture: ComponentFixture<ENoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ENoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ENoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
