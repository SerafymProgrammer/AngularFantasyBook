import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Book } from '../Interfaces/book';
import { BookService } from '../services/book.service';
import { ChooseImageService } from '../services/chooseImage.service';
import { AddElementService } from '../services/add-element.service';


@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  name: string;
  id: number;
  public imagePath;
  imgURL = this.data.book.img;
  public message: string;
  author: string;
  books: Book[];
  book: {};
  bookOfPut: Book;
  myFirstForm: FormGroup;
  @Output() update = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    public dialogRef: MatDialogRef<EditBookComponent>,
    private chooseImageService: ChooseImageService,
    private addElementService: AddElementService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.createForm();

    this.bookService.getDataBooks().subscribe(data => {
      this.books = data;
    });
  }

  createForm() {
    this.myFirstForm = this.fb.group({
      name: [this.data.book.
        name, [Validators.required]],
      author: [this.data.book.author, Validators.required],
      price: [this.data.book.price, [Validators.required]],
      description:  [this.data.book.description]
    });
  }

  save() {
    this.name = this.myFirstForm.value.name;
    this.author = this.myFirstForm.value.author;
    this.bookOfPut = {
      name: this.myFirstForm.value.name,
      author: this.myFirstForm.value.author,
      price: this.myFirstForm.value.price,
      img: this.imgURL,
      id: this.data.book.id,
      description: this.myFirstForm.value.description};

    if (this.myFirstForm.status !== 'VALID') {
      return;
    }


    this.book = { name: this.name, author: this.author, img: this.imgURL };
    this.bookService.putDataBook(this.bookOfPut, this.data.book.id)
      .subscribe(() => {
        this.update.emit({
          id: this.data.book.id,
          name: this.name,
          author: this.author,
          img: this.imgURL,
          price: '' + this.myFirstForm.value.price
        });
        this.dialogRef.close();
      }, error => console.log(error)
      );

  }


  preview(files) {
    this.addElementService.observable.subscribe((x) => {
      this.imgURL = x;
    });
    this.chooseImageService.preview(files);
  }

}
