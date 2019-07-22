import { Component, OnInit} from '@angular/core';
import { DataSubjectService} from './services/dataSubject.service';
import {Observable,  Subject, Subscription} from 'rxjs';
import { User } from './Interfaces/user';

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
  constructor() {
  }
  ngOnInit() {

  }



}
