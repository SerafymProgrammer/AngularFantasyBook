import { Component, OnInit} from '@angular/core';
import { DataSubjectService} from './services/dataSubject.service';
import {Observable,  Subject, Subscription} from 'rxjs';
import { User } from './Interfaces/user';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'myFirstProj';

  message: any;
  subscription: Subscription;
  users: User[] = [];
  constructor(private spinner: NgxSpinnerService) {
  }
  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
  }



}
