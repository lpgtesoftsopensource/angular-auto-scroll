import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizentralAnimationComponent } from './horizentral-animation.component';

describe('HorizentralAnimationComponent', () => {
  let component: HorizentralAnimationComponent;
  let fixture: ComponentFixture<HorizentralAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizentralAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizentralAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
