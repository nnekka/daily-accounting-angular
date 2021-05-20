import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces";
import {Observable} from "rxjs/internal/Observable";
import {tap} from "rxjs/operators";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string
  private user: User
  private tokenTimer: any
  userLogged : BehaviorSubject<User> = new BehaviorSubject<User>(null)
  isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  setToken(token: string){
    this.token = token
  }

  getToken(){
    return this.token
  }

  isAuthorized(){
    return !!this.token
  }

  login(email: string, password: string): Observable<User>{
    return this.http.post<User>('/api/users/login', {email, password})
      .pipe(
        tap(
          (user: User) => {
            //
            this.setToken(user.token)
            this.userLogged.next(user)
            this.isAuth.next(true)

            //сохранение в локалсторэдж
            const expiresIn = user.expiresIn
            this.setTokenTimer(expiresIn)
            const now = new Date()
            const expirationDate = new Date(now.getTime() + expiresIn * 1000)
            this.saveToLocalStorage(user.token, expirationDate, user)
          }
        )
      )
  }

  register(name: string, email: string, password: string): Observable<User>{
    return this.http.post<User>('/api/users/signup', {name, email, password})
  }

  authorization(){
    const authInfo = this.getFromLocalStorage()
    if (!authInfo){
      return
    }
    const now = new Date()
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime()
    if (expiresIn > 0) {
      this.setToken(authInfo.token)
      this.isAuth.next(true)
      this.userLogged.next(authInfo.user)
      this.setTokenTimer(expiresIn / 1000)
    }
  }

  private saveToLocalStorage(token: string, expirationDate: Date, user: User){
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', expirationDate.toISOString())
    localStorage.setItem('user', JSON.stringify(user))
  }

  private getFromLocalStorage(){
      const token = localStorage.getItem('token')
      const expirationDate = localStorage.getItem('expiration')
      const user = JSON.parse(localStorage.getItem('user'))
      if (!token || !expirationDate || !user) {
        return
      }

      return {
        token: token,
        expirationDate: new Date(expirationDate),
        user: user
      }
  }

  private clearLocalStorage(){
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
    localStorage.removeItem('user')
  }

  private setTokenTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000)
  }

  logout(){
    this.setToken(null)
    this.userLogged.next(null)
    this.isAuth.next(false)
    this.clearLocalStorage()
    this.router.navigate(['/'])
  }


}
