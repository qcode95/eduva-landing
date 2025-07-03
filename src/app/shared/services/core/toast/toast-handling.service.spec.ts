import { TestBed } from '@angular/core/testing';

import { vi } from 'vitest';

import { MessageService } from 'primeng/api';

import { ToastHandlingService } from './toast-handling.service';

describe('ToastHandlingService', () => {
  let service: ToastHandlingService;
  const mockMessageService = {
    add: vi.fn(),
    clear: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ToastHandlingService,
        { provide: MessageService, useValue: mockMessageService },
      ],
    });
    service = TestBed.inject(ToastHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
