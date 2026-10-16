import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomkComponent } from './homk.component';

describe('HomkComponent', () => {
  let component: HomkComponent;
  let fixture: ComponentFixture<HomkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
