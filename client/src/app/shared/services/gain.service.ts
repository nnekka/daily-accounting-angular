import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Gain, GainCategory} from "../interfaces";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Observable} from "rxjs/internal/Observable";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GainService {

  gainCategories: GainCategory[]
  gainCategoriesSubject: BehaviorSubject<GainCategory[]> = new BehaviorSubject<GainCategory[]>([])

  gains: Gain[]
  gainSubject: BehaviorSubject<Gain[]> = new BehaviorSubject<Gain[]>([])




  constructor(
    private http: HttpClient
  ) {}

  //--------------------------------------Gain Categories Block Begin--------------------------------------

  getGainCategories(): Observable<GainCategory[]>{
    return this.http.get<GainCategory[]>('/api/gainCategories')
      .pipe(
        tap(
          (categories: GainCategory[]) => {
            this.gainCategories = categories
            this.gainCategoriesSubject.next(this.gainCategories)
          }
        )
      )
  }

  getGainCategory(id: string): Observable<GainCategory>{
    return this.http.get<GainCategory>(`/api/gainCategories/${id}`)
  }

  createGainCategory(name: string): Observable<GainCategory>{
    return this.http.post<GainCategory>(`/api/gainCategories`, {name})
  }

  updateGainCategory(name: string, id: string): Observable<GainCategory>{
    return this.http.put<GainCategory>(`/api/gainCategories/${id}`, {name})
  }

  deleteGainCategory(id: string): Observable<{message: string}>{
    return this.http.delete<{message: string}>(`/api/gainCategories/${id}`)
  }


  //--------------------------------------Gain Categories Block End----------------------------------------
  //--------------------------------------Gains Block Begin------------------------------------------------
  getGains(): Observable<Gain[]>{
    return this.http.get<Gain[]>('/api/gains')
      .pipe(
        tap(
          (gains: Gain[]) => {
            this.gains = gains
            this.gainSubject.next(this.gains)
          }
        )
      )
  }

  getGain(id: string): Observable<Gain>{
    return this.http.get<Gain>(`/api/gains/${id}`)
  }

  createGain(sum: number, categoryId: string, accountId: string): Observable<Gain>{
    return this.http.post<Gain>('/api/gains', {sum, categoryId, accountId})
  }

  updateGain(sum: number, id: string): Observable<Gain>{
    return this.http.put<Gain>(`/api/gains/${id}`, {sum})
  }

  deleteGain(id: string): Observable<{message: string}>{
    return this.http.delete<{message: string}>(`/api/gains/${id}`)
  }

  //--------------------------------------Gains Block End--------------------------------------------------



}
