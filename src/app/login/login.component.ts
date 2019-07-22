import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder, FormArray} from '@angular/forms';
import { DataSubjectService} from '../services/dataSubject.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';
import { User } from '../Interfaces/user';
import { UserService } from '../services/user.service';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],

  })

export class AppLoginComponent implements OnInit {
  users: User[];
  private email: string;
  private subscription: Subscription;
  myFirstForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataSubjectService,
    private userService: UserService,
   ) {
    this.email = route.snapshot.params.email;
  }
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.myFirstForm = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async  signIn() {

     this.userService.authorizationUser(this.myFirstForm.value).subscribe(data => {
       if (!data) {
        this.toastr.error('Invalid data', 'ERROR');
        return;
       }
       this.router.navigate(['/']);
       this.toastr.success('Hello', 'SUCCESS');
       localStorage.setItem('user', JSON.stringify(Object.assign(data, { email: this.myFirstForm.value.email })));
       localStorage.setItem('basket', JSON.stringify({
         bookArr: [],
         totalBook: {
           totalCount: 0,
           totalPrice: 0
         }
       }));
       this.dataService.triggerEvent({ email: this.myFirstForm.value.email });
     });
  }
}

