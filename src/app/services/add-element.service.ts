import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddElementService {

  constructor() { }
  private dataChange: Subject<any> = new Subject<any>();
  observable = this.dataChange.asObservable();


  triggerEvent(str: string | ArrayBuffer) {
     this.dataChange.next(str);
  }

}
