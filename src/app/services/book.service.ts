import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Interfaces/user';
import { Book } from '../Interfaces/book';
import { TotalPriceService } from './total-price.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, private totalPriceService: TotalPriceService) { }

  getDataBooks(): Observable<Book[]> {

    return this.http.get<Book[]>(`${environment.apiUrl}/books/`);
  }

  getDataBasket() {

    return this.http.get<Book[]>(`${environment.apiUrl}/basket/`);
  }

  deleteBook(book: Book) {
    return this.http.delete(`${environment.apiUrl}/books/${book.id}`);
  }

  postDataBook(book: Book) {

    return this.http.post(`${environment.apiUrl}/books/`, book);
  }

  postDataBasket(book: Book) {

    return this.http.post(`${environment.apiUrl}/basket/`, book);
  }

  putDataBook(book: Book, id: number) {

    return this.http.put(`${environment.apiUrl}/books/${id}/`, book);
  }


  totalScoreBooks(books) {
    let countBooks = 0;
    let priceBooks = 0;

    console.log(books);
    for (const book of books.bookArr) {
      if (!book.countTheSameBooks) {
        book.countTheSameBooks = 1;
      }
    }

    if (books.bookArr.length > 1) {
      for (let i = 0; i < books.bookArr.length; i++) {
        for (let j = books.bookArr.length - 1; j > i; j--) {
          if (books.bookArr[i].id === books.bookArr[j].id) {
            books.bookArr[i].countTheSameBooks++;
            books.bookArr.splice(j, 1);
          }
        }
      }
    }

    for (const book of books.bookArr) {
      countBooks += 1 * book.countTheSameBooks;
      priceBooks += book.price * book.countTheSameBooks;
    }
    // tslint:disable-next-line:prefer-const
    let booksInBasket = JSON.parse(localStorage.getItem('basket'));
      // tslint:disable-next-line:no-unused-expression
    booksInBasket.bookArr = books.bookArr;
    booksInBasket.totalBook.totalCount = countBooks;
    booksInBasket.totalBook.totalPrice = priceBooks;
    this.totalPriceService.addPriceEvent(priceBooks);
    localStorage.setItem('basket', JSON.stringify(booksInBasket));
    return booksInBasket;
    }

}


