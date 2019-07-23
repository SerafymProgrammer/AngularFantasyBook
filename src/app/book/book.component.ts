import { Component, OnInit, AfterContentInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookElementSubscribeService } from '../services/book-element-subscribe.service';
import { Book } from '../Interfaces/book';
import { BookService } from '../services/book.service';
import { TotalPriceService } from '../services/total-price.service';


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
    private bookElementSubscribeService: BookElementSubscribeService,
    private activateRoute: ActivatedRoute,
    private bookService: BookService,
    private totalPriceService: TotalPriceService) {
  }


  ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe(params => this.id = params.id as number);
    this.bookService.getDataBooks().subscribe(data => {
    // this.book = data.filter(x => {
    //   return x.id === this.id;
    // })[1];
    for (const el of data) {
      console.log(el);
      if (el.id == this.id) {
       this.book = el;
      }
    }
    });

  }

  addToBasket() {
      // tslint:disable-next-line:prefer-const
      let booksInBasket = JSON.parse(localStorage.getItem('basket'));
      // tslint:disable-next-line:no-unused-expression
      booksInBasket.bookArr.push(this.book);
      booksInBasket = this.bookService.totalScoreBooks(booksInBasket);
     // this.totalPriceService.addPriceEvent(this.totalPrice);
      localStorage.setItem('basket', JSON.stringify(booksInBasket));
  }

  showAllText() {
    this.showAll = true;
  }

  hideText() {
    this.showAll = false;
  }
}