import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // because our http res are comming back as observable
    //we need to use rxjs catch error method in order to cath the error out of the observable itself
    return next.handle(request).pipe(
      catchError((error) => {
        // error here is the status code comming back from
        if (error) {
          if (error.status === 400)
            this.toastr.error(error.error.message, error.error.statusCode);
          if (error.status === 401)
            this.toastr.error(error.error.message, error.error.statusCode);
          if (error.status === 404) this.router.navigateByUrl('/not-found');
          if (error.status === 500) {
            const navigtionExtras: NavigationExtras = {
              state: { error: error.error },
            };
            this.router.navigateByUrl('/server-error', navigtionExtras);
          }
        }
        return throwError(error);
      })
    );
  }
}
