import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder, FormArray} from '@angular/forms';
import { SendEmailToHeaderService} from '../services/send-email-to-header.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';
import { User } from '../Interfaces/user';
import { UserService } from '../services/user.service';
import jwt from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],

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
    private sendEmailToHeaderService: SendEmailToHeaderService,
    private userService: UserService,
    private spinner: NgxSpinnerService
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

  decodeToLocalStorage = (data: any) => {
    const decode: User = jwt(data.userToken);
    localStorage.setItem('user', JSON.stringify(
      {userToken: data.userToken, email: decode.email, id: decode.id, img: data.img, isAdmin: decode.isAdmin}));
}

  signIn() {

    this.userService.authorizationUser(this.myFirstForm.value).subscribe(data => {
      if (!data) {
        this.toastr.error('Invalid data', 'ERROR');
        return;
      }
      this.spinner.show();
      setTimeout(() => {
        this.router.navigate(['/']);
        this.toastr.success('Hello', 'SUCCESS');
        this.decodeToLocalStorage(data);
        localStorage.setItem('basket', JSON.stringify({
          bookArr: [],
          totalBook: {
            totalCount: 0,
            totalPrice: 0
          }
        }));
        this.sendEmailToHeaderService.triggerEvent({ email: this.myFirstForm.value.email });
        this.spinner.hide();
      }, 2000);

    });
  }
}

