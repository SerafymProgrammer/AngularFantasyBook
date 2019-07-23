import { Component, OnInit } from '@angular/core';
import { SendEmailToHeaderService} from '../services/send-email-to-header.service';
import { Router } from '@angular/router';
import {Subscription} from 'rxjs';
import { PopupBasketComponent } from '../popup-basket/popup-basket.component';
import {MatDialog} from '@angular/material/dialog';
import { User } from '../Interfaces/user';
import { Book } from '../Interfaces/book';
import { BookService } from '../services/book.service';
import { TotalPriceService } from '../services/total-price.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navBarHidden = true;
  users: User[];
  imgURL: any;
  email: string;
  private subscription: Subscription;
  isHidden = false;
  isShowBasket = false;
  bookInBasket: Book;
  // tslint:disable-next-line:ban-types
  booksInBasket: any;
  count = 0;
  totalPrice = 0;
  currentUser: any;

  showBasket() {
    this.isShowBasket = true;
  }
  hideBasket() {
    this.isShowBasket = false;
  }

  constructor(
    private router: Router,
    private sendEmailToHeaderService: SendEmailToHeaderService,
    public dialog: MatDialog,
    private bookService: BookService,
    private totalPriceService: TotalPriceService
  ) {

    const user = localStorage.getItem('user');
    if (user !== null) {
      this.isHidden = true;
      const currentUser = JSON.parse(localStorage.getItem('user'));
      this.email = currentUser.email;
      if (currentUser.img !== (null || undefined)) {
        this.imgURL = currentUser.img;
      }

    }
  }

  openDialogAddBookInBasket(): void {
    const dialogRef = this.dialog.open(PopupBasketComponent, {
      data: { book: this.bookInBasket }
    });
  }
  ngOnInit() {
    this.sendEmailToHeaderService.observable.subscribe(x => {
      if (x) {
        this.email = x.email;
        this.isHidden = true;
        if (x.img !== (null || undefined)) {
          this.imgURL = x.img;
        }
      } else {
        this.currentUser = JSON.parse(localStorage.getItem('user'));

        if (this.currentUser) {
          this.email = this.currentUser.email;
          this.isHidden = true;
        }
      }
    });

    this.booksInBasket = JSON.parse(localStorage.getItem('basket'));
    this.totalPrice = this.booksInBasket.totalBook.totalPrice;

    this.totalPriceService.observable.subscribe((price) => {
      this.totalPrice = price;
    });
  }


  logOut() {
    localStorage.removeItem('user');
    this.isHidden = false;
    this.router.navigate(['/']);
  }

  settingUser() {
    this.router.navigate(['/settingUser']);
  }

  mouseHover() {
    this.navBarHidden = false;
  }
  mouseLeave() {
    this.navBarHidden = true;
  }
}
