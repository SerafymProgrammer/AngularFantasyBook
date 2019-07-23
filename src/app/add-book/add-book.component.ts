import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder, FormArray} from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Book } from '../Interfaces/book';
import { BookService } from '../services/book.service';
import { ChooseImageService } from '../services/chooseImage.service';
import { AddElementService } from '../services/add-element.service';




@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  name: string;
  author: string;
  id: number;
  public imagePath;
  imgURL: string;
  public message: string;
  books: Book[];
  book: {};
  bookOfAdd: Book;

  @Output() update = new EventEmitter();

  myFirstForm: FormGroup;
  price: any;

  constructor(
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddBookComponent>,
              private bookService: BookService,
              private chooseImageService: ChooseImageService,
              private addElementService: AddElementService) { }

  ngOnInit() {
    this.createForm();
    this.bookService.getDataBooks().subscribe(data => {
      this.books = data;
    });

  }

  createForm() {
    this.myFirstForm = this.fb.group({
      name: ['', [Validators.required]],
      author: ['', Validators.required],
      price: ['', [Validators.required]],
      description:  ['']
    });
  }

  addNewBook() {
    this.name = this.myFirstForm.value.name;
    this.author = this.myFirstForm.value.author;
    this.price = this.myFirstForm.value.price;
    if (this.myFirstForm.status !== 'VALID') {return; }

    this.book = { name: this.name, author: this.author, img: this.imgURL, price: '' + this.myFirstForm.value.price };
    let imgForPost;

    if (this.imgURL) {
       imgForPost = this.imgURL;
    } else {
       imgForPost = '';
    }

    this.bookService.postDataBook(Object.assign(this.myFirstForm.value, { img: imgForPost}))
      .subscribe(() => {
        this.update.emit(this.book);
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
