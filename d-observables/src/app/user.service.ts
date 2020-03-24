import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  /** Use subject only on subscribe not on @Output() */
  activatedEmitter = new Subject<boolean>();
}
