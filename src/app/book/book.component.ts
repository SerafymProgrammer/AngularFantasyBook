import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from '../Interfaces/book';
import { BookService } from '../services/book.service';
import { TotalPriceService } from '../services/total-price.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  book: Book ;
  books: Book[];
  private id: number;
  private subscription: Subscription;
  showAll = false;
  totalPrice = 0;

  constructor(
    private activateRoute: ActivatedRoute,
    private bookService: BookService,
    private totalPriceService: TotalPriceService,
    private spinner: NgxSpinnerService) {
  }


  ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe(params => this.id = params.id as number);
    this.bookService.getDataBooks().subscribe(data => {

    this.spinner.show();

    setTimeout(() => {
      for (const el of data) {
        console.log(el);
        if (el.id == this.id) {
          this.book = el;
        }
      }
      this.spinner.hide();
    }, 2000);

    });

  }

  addToBasket() {
      let booksInBasket = JSON.parse(localStorage.getItem('basket'));
      booksInBasket.bookArr.push(this.book);
      booksInBasket = this.bookService.totalScoreBooks(booksInBasket);
      localStorage.setItem('basket', JSON.stringify(booksInBasket));
  }

  showAllText() {
    this.showAll = true;
  }

  hideText() {
    this.showAll = false;
  }
}
