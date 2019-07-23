import { AfterViewInit, Component, OnInit, ViewChild, Inject, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { BookService } from '../services/book.service';
import { TotalPriceService } from '../services/total-price.service';

@Component({
  selector: 'app-popup-basket',
  templateUrl: './popup-basket.component.html',
  styleUrls: ['./popup-basket.component.scss']
})
export class PopupBasketComponent implements OnInit {

  @Output() update = new EventEmitter();

  count = 1;
  totalPrice = 0;
  booksInBasket: any;

  constructor(
    public dialogRef: MatDialogRef<PopupBasketComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private bookService: BookService,
    private totalPriceService: TotalPriceService) {

  }

  ngOnInit() {

    this.booksInBasket = this.bookService.totalScoreBooks(JSON.parse(localStorage.getItem('basket')));

    this.totalPrice = this.booksInBasket.totalBook.totalPrice;
    this.count = this.booksInBasket.totalBook.totalCount;

  }

  addBook(book) {
    let purchaseInBasket = JSON.parse(localStorage.getItem('basket'));
    console.log(purchaseInBasket);
    let i = 0;
    purchaseInBasket.bookArr.forEach((element, ind) => {
      if (element.id === book.id) {
        i = ind;
      }
    });
    book.countTheSameBooks++;
    purchaseInBasket.bookArr[i].countTheSameBooks++;
    purchaseInBasket = this.bookService.totalScoreBooks(purchaseInBasket);
    this.totalPrice = purchaseInBasket.totalBook.totalPrice;
    this.count = purchaseInBasket.totalBook.totalCount;
    localStorage.setItem('basket', JSON.stringify(purchaseInBasket));
  }

  deleteOneBook(book) {

    let purchaseInBasket = JSON.parse(localStorage.getItem('basket'));
    console.log(purchaseInBasket);
    let i = 0;
    purchaseInBasket.bookArr.forEach((element, ind) => {
      if (element.id === book.id) {
        i = ind;
      }
    });
    localStorage.setItem('basket', JSON.stringify(purchaseInBasket));

    if (book.countTheSameBooks > 1) {

      book.countTheSameBooks--;
      purchaseInBasket.bookArr[i].countTheSameBooks--;
      purchaseInBasket = this.bookService.totalScoreBooks(purchaseInBasket);
      this.totalPrice = purchaseInBasket.totalBook.totalPrice;
      this.count = purchaseInBasket.totalBook.totalCount;
      localStorage.setItem('basket', JSON.stringify(purchaseInBasket));
    } else if (book.countTheSameBooks === 1) {
      delete purchaseInBasket.bookArr[i].countTheSameBooks;
      purchaseInBasket.bookArr.splice(i, 1);
      this.booksInBasket = this.bookService.totalScoreBooks(purchaseInBasket);
      this.totalPrice = this.booksInBasket.totalBook.totalPrice;
      this.count = this.booksInBasket.totalBook.totalCount;
      localStorage.setItem('basket', JSON.stringify(this.booksInBasket));
    }
  }

  deleteBook(book) {
    // tslint:disable-next-line:prefer-const
    let purchaseInBasket = JSON.parse(localStorage.getItem('basket'));
    console.log(purchaseInBasket);
    let i = 0;
    purchaseInBasket.bookArr.forEach((element, ind) => {
      if (element.id === book.id) {
        i = ind;
      }
    });

    localStorage.setItem('basket', JSON.stringify(purchaseInBasket));
    book.countTheSameBooks = 0;
    delete purchaseInBasket.bookArr[i].countTheSameBooks;
    purchaseInBasket.bookArr.splice(i, 1);
    this.booksInBasket = this.bookService.totalScoreBooks(purchaseInBasket);
    this.totalPrice = this.booksInBasket.totalBook.totalPrice;
    this.count = this.booksInBasket.totalBook.totalCount;
    localStorage.setItem('basket', JSON.stringify(this.booksInBasket));
    }


}
