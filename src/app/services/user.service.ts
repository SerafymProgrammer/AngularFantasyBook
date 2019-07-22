import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegister, User } from '../Interfaces/user';
import { Book } from '../Interfaces/book';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // tslint:disable-next-line:ban-types
  isAdmin = false;

  constructor(private http: HttpClient) { }

  getDataUser(): Observable<User[]> {

    if (JSON.parse(localStorage.getItem('user')).isAdmin) {
      return this.http.get<User[]>('http://localhost:3000/users');
    }
  }

  postDataUser(user: UserRegister) {
    if (localStorage.getItem('user')) {
      if (JSON.parse(localStorage.getItem('user')).isAdmin) {
        return this.http.post('http://localhost:3000/auth/register', user);
      } else {
        return;
      }
    }

    return this.http.post('http://localhost:3000/auth/register', user);

  }

  putDataUser(user: User, id: number) {

    if (user.email === 'admin@gmail.com') {
      this.isAdmin = true;
    }

    return this.http.put(`http://localhost:3000/users/${id}`, Object.assign(user, { isAdmin: this.isAdmin }));
  }

  putCurrentUser(user: UserRegister, id: number) {

    if (user.email === 'admin@gmail.com') {
      this.isAdmin = true;
    }

    return this.http.put(`http://localhost:3000/users/currUser/${id}`, Object.assign(user, { isAdmin: this.isAdmin }));
  }

  deleteUser(user: User) {

    return this.http.delete(`http://localhost:3000/users/${user.id}`);

   }

   authorizationUser(user: User) {
    if (user.email === 'admin@gmail.com') {
      this.isAdmin = true;
    }
    return this.http.post<User>('http://localhost:3000/auth/login',  Object.assign(user, { isAdmin: this.isAdmin }));
   }
}
