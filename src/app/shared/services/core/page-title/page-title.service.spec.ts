import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { of, Subject } from 'rxjs';

import { vi } from 'vitest';

import { PageTitleService } from './page-title.service';

describe('PageTitleService', () => {
  let service: PageTitleService;
  let events$: Subject<any>;

  beforeEach(() => {
    events$ = new Subject();

    TestBed.configureTestingModule({
      providers: [
        PageTitleService,
        {
          provide: Router,
          useValue: {
            events: events$.asObservable(),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: createMockActivatedRoute({ title: 'Test Page' }, 2),
        },
        {
          provide: Title,
          useValue: {
            setTitle: vi.fn(),
          },
        },
      ],
    });
    service = TestBed.inject(PageTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

function createMockActivatedRoute(data: any, depth: number): any {
  if (depth === 0) {
    return {
      firstChild: null,
      data: of(data),
    };
  }

  return {
    firstChild: createMockActivatedRoute(data, depth - 1),
    data: of({}),
  };
}
