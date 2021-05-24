import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ErrorComponent} from "./components/error/error.component";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private dialog: MatDialog
  ){}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          console.log(error)
          let errorMessage = 'Smth wrong happened'
          if(error.error.errors[0].msg){
            errorMessage = error.error.errors[0].msg
          }
          this.dialog.open(ErrorComponent, {data: {message: errorMessage} })
          return throwError(error)
        }
      )
    )
  }
}
