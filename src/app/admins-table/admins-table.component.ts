import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import { AdminsTableDataSource, AdminsTableItem } from './admins-table-datasource';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormArray} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PopupEditUserComponent } from '../popup-edit-user/popup-edit-user.component';
import { PopupAddUserComponent } from '../popup-add-user/popup-add-user.component';
import { SelectionModel } from '@angular/cdk/collections';

import { UserService } from '../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-admins-table',
  templateUrl: './admins-table.component.html',
  styleUrls: ['./admins-table.component.scss'],
})
export class AdminsTableComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<AdminsTableItem>;
  dataSource: MatTableDataSource<AdminsTableItem>;
  url = `${environment.apiUrl}/user`;
  isBookList = false;
  show = true;
  email: string;
  password: string;
  name: string;
  id: number;
  selectedFile = null;
  showChangePasswords = false;
  public message: string;
  isSelecteds: boolean;
  btnShowSelects = true;
  myFirstForm: FormGroup;
  displayedColumns = ['id', 'email', 'password', 'actions'];
  selection = new SelectionModel<AdminsTableItem>(true, []);

  constructor(public dialog: MatDialog,
              private toastr: ToastrService,
              private userService: UserService,
              private spinner: NgxSpinnerService
         ) {
  }

  async ngOnInit() {



    this.dataSource = new MatTableDataSource<AdminsTableItem>();
    await this.userService.getDataUser().subscribe(data => {
      this.spinner.show();

      setTimeout(() => {
        this.dataSource.data = data;
        this.spinner.hide();
      }, 2000);
    });
    this.table.dataSource = this.dataSource;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Selected functions

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      this.delete(item);
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => { this.selection.select(row); });
  }

  showSelectedRows() {
    this.displayedColumns.unshift('select');
    this.isSelecteds = true;
    this.btnShowSelects = false;
  }

  hiddenSelectedRows() {
    this.displayedColumns.shift();
    this.isSelecteds = false;
    this.btnShowSelects = true;
  }

  delete(user) {

    if (user.email !== 'Admin@gmail.com') {
      this.dataSource.data.splice(this.dataSource.data.indexOf(user), 1);

      const arrayUser = this.dataSource.data;

      this.dataSource = new MatTableDataSource<AdminsTableItem>();
      this.dataSource.data = arrayUser;
      this.table.dataSource = this.dataSource;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.userService.deleteUser(user).subscribe(() => {
      }, error => console.log(error));
    } else {
      this.toastr.error('Нельзя удалить админа', 'Нарываешься');
    }
  }

  openDialogAddUser(): void {

    const dialogRef = this.dialog.open(PopupAddUserComponent, {

    });

    dialogRef.componentInstance.update.subscribe((userChanged) => {

      const arrayUser = this.dataSource.data;

      arrayUser.push(userChanged);
      this.dataSource = new MatTableDataSource<AdminsTableItem>();
      this.dataSource.data = arrayUser;
      this.table.dataSource = this.dataSource;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialogEditUser(userOfChange): void {
    if (userOfChange.email === 'Admin@gmail.com') {
      this.toastr.error('Нельзя изменить админа', 'Ошибка');
      return;
    }
    const dialogRef = this.dialog.open(PopupEditUserComponent, {
      data: { user: userOfChange }
    });

    dialogRef.componentInstance.update.subscribe((userChanged) => {

      const arrayUser = this.dataSource.data;

      for (let i = 0; i < arrayUser.length; i++) {
        if (arrayUser[i].id === userChanged.id) {
          arrayUser[i] = userChanged;
        }
      }
      this.dataSource = new MatTableDataSource<AdminsTableItem>();
      this.dataSource.data = arrayUser;
      this.table.dataSource = this.dataSource;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

}
