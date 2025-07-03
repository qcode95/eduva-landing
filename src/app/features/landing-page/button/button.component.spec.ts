import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { ButtonComponent } from './button.component';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  template: `<app-button
    [text]="'Submit'"
    [type]="'primary'"
    (clickEvent)="handleClick($event)"></app-button>`,
})
class TestHostComponent {
  handleClick = vi.fn();
}

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the button with correct text', () => {
    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.textContent).toContain('Submit');
  });

  it('should emit click event on button click', () => {
    const buttonEl = fixture.nativeElement.querySelector('button');
    buttonEl.click();

    expect(hostComponent.handleClick).toHaveBeenCalled();
  });
});
