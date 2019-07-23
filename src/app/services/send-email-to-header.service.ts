import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';



@Injectable()
export class SendEmailToHeaderService {

     private dataChange: Subject<any> = new Subject<any>();
     observable = this.dataChange.asObservable();
     triggerEvent(str: {}) {
        this.dataChange.next(str);
     }

}
