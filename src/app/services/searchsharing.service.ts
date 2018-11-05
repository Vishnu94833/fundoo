import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchsharingService {

  private messageSource = new Subject();
  currentMessage = this.messageSource.asObservable();

  private gridEvent = new Subject<boolean>();
  currentGridEvent = this.gridEvent.asObservable();

  constructor() {}

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeGridEvent(message: boolean) {
    this.gridEvent.next(message)
  }
}
