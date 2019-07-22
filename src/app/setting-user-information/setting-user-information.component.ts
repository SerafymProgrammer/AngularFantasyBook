import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder, FormArray} from '@angular/forms';
import { DataSubjectService} from '../services/dataSubject.service';
import { User } from '../Interfaces/user';
import { UserService } from '../services/user.service';
import { ChooseImageService } from '../services/chooseImage.service';
import { AddElementService } from '../services/add-element.service';


@Component({
  selector: 'app-setting-user-information',
  templateUrl: './setting-user-information.component.html',
  styleUrls: ['./setting-user-information.component.css']
})
export class SettingUserInformationComponent implements OnInit {
  show = true;
  id: number;
  selectedFile = null;
  currentUser = JSON.parse(localStorage.getItem('user'));
  email: string = this.currentUser.email;
  password: string = this.currentUser.password;
  showChangePasswords = false;
  public imagePath;
  imgURL: any;
  public message: string;
  users: User[];
  myFirstForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataSubjectService,
    private userService: UserService,
    private chooseImageService: ChooseImageService,
    private addElementService: AddElementService) {
   }
   ngOnInit() {
    this.createForm();
  }

   createForm() {
    this.myFirstForm = this.fb.group({
      email: [this.currentUser.email, [Validators.required, Validators.email]],
      password: [this.currentUser.password, Validators.required],
      confirmedPassword: ['', Validators.required]
  });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.myFirstForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
    }

  settingInformation() {
    this.show = false;
    this.imgURL = this.currentUser.img;
  }

  cancel() {
    this.show = true;
  }

  save() {

    this.email = this.myFirstForm.value.email;
    this.password = this.myFirstForm.value.password;

    const currentUser = JSON.parse(localStorage.getItem('user'));
    currentUser.email =  this.email;

    this.userService.putCurrentUser({ id: this.id, email: this.email, password: this.password}, currentUser.id)
      .subscribe(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
        this.dataService.triggerEvent({ email: this.email});
        this.show = true;
      }, error => console.log(error)
      );
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  showChangePasswordsClick() {
    if (this.showChangePasswords === false) {
      this.showChangePasswords = true;
    } else {
      this.showChangePasswords = false;
    }
  }

}
