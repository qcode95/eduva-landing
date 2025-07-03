import { TestBed } from '@angular/core/testing';

import { FixedBarService } from './fixed-bar.service';

describe('FixedBarService', () => {
  let service: FixedBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixedBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
