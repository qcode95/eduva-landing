import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { MessageService } from 'primeng/api';

import { SignUpModalComponent } from './sign-up-modal.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('SignUpModalComponent', () => {
  let component: SignUpModalComponent;
  let fixture: ComponentFixture<SignUpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpModalComponent],
      providers: [
        MessageService,
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: createMockActivatedRoute({ title: 'Test Page' }, 2),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
