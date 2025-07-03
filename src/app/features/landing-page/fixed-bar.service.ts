import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FixedBarService {
  showBar$ = new BehaviorSubject<boolean>(false);
}
