import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: createMockActivatedRoute({ title: 'Test Page' }, 2),
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

function createMockActivatedRoute(data: any, depth: number): any {
  if (depth === 0) return { firstChild: null, data: of(data) };

  return {
    firstChild: createMockActivatedRoute(data, depth - 1),
    data: of({}),
  };
}
