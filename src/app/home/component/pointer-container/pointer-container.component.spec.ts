import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointerContainerComponent } from './pointer-container.component';

describe('PointerContainerComponent', () => {
  let component: PointerContainerComponent;
  let fixture: ComponentFixture<PointerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointerContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
