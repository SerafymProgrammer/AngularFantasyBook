import { AfterViewInit, Component, OnInit, ViewChild, Inject, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormArray, Validators} from '@angular/forms';

import { User } from '../Interfaces/user';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-popup-add-user',
  templateUrl: './popup-add-user.component.html',
  styleUrls: ['./popup-add-user.component.scss']
})
export class PopupAddUserComponent implements OnInit {

  @Output() update = new EventEmitter();

  users: User[];
  email: string;
  password: string;
  name: string;
  id: number;
  data: {};
  myFirstForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PopupAddUserComponent>,
    private userService: UserService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    this.createForm();

    this.userService.getDataUser().subscribe(data => {
      this.users = data;
    });
  }

  createForm() {
    this.myFirstForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  saveNewUser() {
    this.email = this.myFirstForm.value.email;
    this.password = this.myFirstForm.value.password;

    if (this.myFirstForm.status === 'INVALID') {
      this.toastr.error('Invalid data', 'ERROR');
      return; }

    this.data = { email: this.email, password: this.password };

    this.userService.postDataUser(this.myFirstForm.value)
      .subscribe(() => {
        this.update.emit(this.data);
        this.dialogRef.close();
      }, error => console.log(error)
      );
  }
}
