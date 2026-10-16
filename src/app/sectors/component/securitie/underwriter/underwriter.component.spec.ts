import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderwriterComponent } from './underwriter.component';

describe('UnderwriterComponent', () => {
  let component: UnderwriterComponent;
  let fixture: ComponentFixture<UnderwriterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderwriterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderwriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
