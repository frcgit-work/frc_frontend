import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankBrokerComponent } from './bank-broker.component';

describe('BankBrokerComponent', () => {
  let component: BankBrokerComponent;
  let fixture: ComponentFixture<BankBrokerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankBrokerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankBrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
