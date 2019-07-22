import {Injectable} from '@angular/core';
import {Observable,  Subject, Subscription, BehaviorSubject} from 'rxjs';



@Injectable()
export class DataSubjectService {

     private dataChange: Subject<any> = new Subject<any>();
     observable = this.dataChange.asObservable();


     triggerEvent(str: {}) {
        this.dataChange.next(str);
     }

}
