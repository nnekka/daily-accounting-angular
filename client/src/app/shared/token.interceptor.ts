import {Injectable} from "@angular/core";

import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs/internal/observable/throwError";
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    if (this.auth.isAuthorized()){
      request = request.clone({
        setHeaders: {
          Authorization: this.auth.getToken()
        }
      })
    }

    return next.handle(request).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.router.navigate(['/login'], {
              queryParams: {
                sessionFailed: true
              }
            })
          }
          return throwError(error)
        }
      )
    )
  }

}
