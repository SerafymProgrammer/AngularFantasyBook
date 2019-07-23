import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder, FormArray} from '@angular/forms';
import { DataSubjectService} from '../services/dataSubject.service';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { UserRegister, User} from '../Interfaces/user';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [DataSubjectService]
})
export class RegisterComponent implements OnInit {
  users: User[];
  url = `${environment.apiUrl}/user`;
  myFirstForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private spinner: NgxSpinnerService ) {

    this.createForm();
  }

  ngOnInit() {
   // this.spinner.show();
  }

  createForm() {
    this.myFirstForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmedPassword: ['', Validators.required]

    });
  }
  submit() {

    if ((this.myFirstForm.value.password === this.myFirstForm.value.confirmedPassword) && this.myFirstForm.status !== 'VALID') {
      this.toastr.error('Invalid email or passwords not equal', 'ERROR');
      return;
    }
    this.userService.postDataUser({id: null, email: this.myFirstForm.value.email, password: this.myFirstForm.value.password, img: ''})
      .subscribe(() => {
        this.spinner.show();
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          this.router.navigate(['/login', { email: this.myFirstForm.value.email }]);
        }, 2000);
         },
        error => console.log(error)
      );

  }
}
