import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Injectable()
export class ParamInterceptor implements HttpInterceptor {

    constructor(private router: Router, private toastr: ToastrService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser && currentUser.userToken) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.userToken}`
                }
            });

        }

        console.log(req);

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status  === 401) {
                    alert(error.status);
                    // tslint:disable-next-line:no-unused-expression
                    this.router.navigate['/login'];
                }
                alert(error);
                let errorMessage = '';
                if (error.error instanceof ErrorEvent) {
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    errorMessage = `Error Code: ${error.status}`;
                }
                this.toastr.error(errorMessage);
                return throwError(errorMessage);
            })
        );

    }
}
