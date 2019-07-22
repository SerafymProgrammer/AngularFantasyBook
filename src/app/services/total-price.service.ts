import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotalPriceService {

  private dataChange: Subject<any> = new Subject<any>();
  observable = this.dataChange.asObservable();

  addPriceEvent(totalPrice: any) {
     this.dataChange.next(totalPrice);
  }
}
