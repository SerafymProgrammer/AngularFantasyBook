import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookElementSubscribeService {

  constructor() { }

  private dataChange: Subject<any> = new Subject<any>();
  observable = this.dataChange.asObservable();


  bookSubscribeEvent(str: {}) {
     this.dataChange.next(str);
  }
}
