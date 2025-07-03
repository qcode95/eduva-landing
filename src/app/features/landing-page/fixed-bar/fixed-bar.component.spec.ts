import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';

import { FixedBarComponent } from './fixed-bar.component';

describe('FixedBarComponent', () => {
  let component: FixedBarComponent;
  let fixture: ComponentFixture<FixedBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixedBarComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            snapshot: {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FixedBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
