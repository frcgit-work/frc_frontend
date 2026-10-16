import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbfiComponent } from './nbfi.component';

describe('NbfiComponent', () => {
  let component: NbfiComponent;
  let fixture: ComponentFixture<NbfiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NbfiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NbfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
