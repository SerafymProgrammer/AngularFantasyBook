import { AfterViewInit, Component, OnInit, ViewChild, Inject, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { ElementRef } from '@angular/core';
import {distinctUntilChanged, filter} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { Book } from '../Interfaces/book';
import { BookService } from '../services/book.service';
import { TotalPriceService } from '../services/total-price.service';



@Component({
  selector: 'app-book-shop',
  templateUrl: './book-shop.component.html',
  styleUrls: ['./book-shop.component.css']
})
export class BookShopComponent implements OnInit {

  @ViewChild('movieSearchInput', {static: true}) movieSearchInput: ElementRef;
  totalPrice = 0;
  books: Book[];
  arr = [];
  booksWithCount = [];
  constructor(
    private router: Router,
    private bookService: BookService,
    private totalPriceService: TotalPriceService
  ) { }
  ngOnInit() {
    this.bookService.getDataBooks().subscribe(data => {
      this.books = data;
      this.booksWithCount = this.books;
      for (const bookEl of this.booksWithCount) {
          bookEl.countTheSameBooks = 0;
      }
    });
    fromEvent(this.movieSearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }), debounceTime(1000), distinctUntilChanged()).subscribe((text: string) => {
      this.bookService.getDataBooks().subscribe((data) => {
        this.arr = [];
        for (const book of data) {
          if (book.name.includes(text) || book.author.includes(text)) {
            this.arr.push(book);
          }
        }
        this.books = this.arr;
      });
    });
  }

  addToBasket(book) {
      // tslint:disable-next-line:prefer-const
      let booksInBasket = JSON.parse(localStorage.getItem('basket'));
      // tslint:disable-next-line:no-unused-expression
      booksInBasket.bookArr.push(book);
      booksInBasket = this.bookService.totalScoreBooks(booksInBasket);
     // this.totalPriceService.addPriceEvent(this.totalPrice);
      localStorage.setItem('basket', JSON.stringify(booksInBasket));
    }

  postBook(book) {
      this.router.navigate(['/bookElement' , `${book.id}`]);
  }

}
