import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GainCategory} from "../interfaces";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Observable} from "rxjs/internal/Observable";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GainService {

  gainCategories: GainCategory[]
  gainCategoriesSubject: BehaviorSubject<GainCategory[]> = new BehaviorSubject<GainCategory[]>([])



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


  //--------------------------------------Gains Block End--------------------------------------------------



}
