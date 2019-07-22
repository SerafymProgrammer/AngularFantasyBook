import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser && currentUser.data) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.data}`
                }
            });
        }

        return next.handle(request);
    }
}
