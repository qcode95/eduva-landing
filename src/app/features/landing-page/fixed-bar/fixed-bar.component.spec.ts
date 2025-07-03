import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedBarComponent } from './fixed-bar.component';

describe('FixedBarComponent', () => {
  let component: FixedBarComponent;
  let fixture: ComponentFixture<FixedBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixedBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
