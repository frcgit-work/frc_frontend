import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecbrokerComponent } from './secbroker.component';

describe('SecbrokerComponent', () => {
  let component: SecbrokerComponent;
  let fixture: ComponentFixture<SecbrokerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecbrokerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecbrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
