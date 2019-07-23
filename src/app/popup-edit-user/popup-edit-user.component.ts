import {  Component, OnInit,  Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormArray, Validators} from '@angular/forms';
import { User } from '../Interfaces/user';
import { UserService } from '../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-popup-edit-user',
  templateUrl: './popup-edit-user.component.html',
  styleUrls: ['./popup-edit-user.component.scss']
})
export class PopupEditUserComponent implements OnInit {

  @Output() update = new EventEmitter();

  email: string;
  password: string;
  id: number;
  users: User[];
  user: {};
  myFirstForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PopupEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private userService: UserService,
    private spinner: NgxSpinnerService ) {
  }

  ngOnInit() {
    this.createForm();
    this.userService.getDataUser().subscribe(data => {
      this.users = data;
    });
  }

  createForm() {
    this.myFirstForm = this.fb.group({
      email: [this.data.user.email, [Validators.required, Validators.email]],
      password: [this.data.user.password, Validators.required]
    });
  }

  save() {
    this.email = this.myFirstForm.value.email;
    this.password = this.myFirstForm.value.password;

    if (this.myFirstForm.status === 'INVALID') { return; }

    this.data.user = { id: this.data.user.id, email: this.email, password: this.password };
    this.userService.putDataUser(this.myFirstForm.value, this.data.user.id)
      .subscribe(() => {
        this.spinner.show();
        setTimeout(() => {
          this.update.emit(this.data.user);
          this.dialogRef.close();
          this.spinner.hide();
        }, 2000);

      }, error => console.log(error));
  }
}

