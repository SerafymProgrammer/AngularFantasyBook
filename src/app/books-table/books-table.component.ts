import { AfterViewInit, Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { BooksTableDataSource, BooksTableItem } from './books-table-datasource';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormArray} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddBookComponent } from '../add-book/add-book.component';
import { EditBookComponent } from '../edit-book/edit-book.component';
import { SelectionModel } from '@angular/cdk/collections';
import { BookService } from '../services/book.service';


@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.css']
})
export class BooksTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<BooksTableItem>;
  dataSource: MatTableDataSource<BooksTableItem>;
  name: string;
  id: number;
  selectedFile = null;
  myFirstForm: FormGroup;
  selection = new SelectionModel<BooksTableItem>(true, []);
  isSelecteds: boolean;
  btnShowSelects = true;
  displayedColumns = ['id', 'img', 'name', 'author', 'price', 'actions'];


  constructor(
    public dialog: MatDialog,
    private bookService: BookService) { }

  updateTable() {
    this.dataSource = new MatTableDataSource<BooksTableItem>();

    this.bookService.getDataBooks().subscribe(data => {
      this.dataSource.data = data;
    });
    this.table.dataSource = this.dataSource;
  }

  async ngOnInit() {
    this.dataSource = new MatTableDataSource<BooksTableItem>();
    await this.bookService.getDataBooks().subscribe(data => {
      this.dataSource.data = data;
    });
    this.table.dataSource = this.dataSource;

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // selection functions

  removeSelectedRows() {
    this.selection.selected.forEach((item) => {
      setTimeout(() => {
        this.deleteBook(item);
      }, 1000);
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

  // Dynamycal functions

  async deleteBook(book) {
    this.dataSource.data.splice(this.dataSource.data.indexOf(book), 1);
    const arrayUs = this.dataSource.data;

    this.dataSource = new MatTableDataSource<BooksTableItem>();
    this.dataSource.data = arrayUs;
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    await this.bookService.deleteBook(book).subscribe(() => {

    }, error => console.log(error));
  }

  openDialogAddNewBook(): void {
    const dialogRef = this.dialog.open(AddBookComponent, {

    });
    dialogRef.componentInstance.update.subscribe((userChanged) => {

      const arrayUs = this.dataSource.data;

      arrayUs.push(userChanged);
      this.dataSource = new MatTableDataSource<BooksTableItem>();
      this.dataSource.data = arrayUs;
      this.table.dataSource = this.dataSource;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }

  openDialogEditBook(bookOfChange): void {

    const dialogRef = this.dialog.open(EditBookComponent, {
      data: { book: bookOfChange }
    });

    dialogRef.componentInstance.update.subscribe((bookChanged) => {
      const arrayUs = this.dataSource.data;
      for (let i = 0; i < arrayUs.length; i++) {
        if (arrayUs[i].id === bookChanged.id) {
          arrayUs[i] = bookChanged;
        }
      }
      this.dataSource = new MatTableDataSource<BooksTableItem>();
      this.dataSource.data = arrayUs;
      this.table.dataSource = this.dataSource;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });

  }


}

