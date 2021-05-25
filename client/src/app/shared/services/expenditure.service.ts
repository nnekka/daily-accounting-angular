import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ExpenditureCategory} from "../interfaces";
import {Observable} from "rxjs/internal/Observable";
import {tap} from "rxjs/operators";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

@Injectable({
  providedIn: 'root'
})
export class ExpenditureService {

  expCategories: ExpenditureCategory[]
  expCategoriesSubject: BehaviorSubject<ExpenditureCategory[]> = new BehaviorSubject<ExpenditureCategory[]>([])

  constructor(
    private http: HttpClient
  ) {}

  getCategories(): Observable<ExpenditureCategory[]>{
    return this.http.get<ExpenditureCategory[]>('/api/expCategories')
      .pipe(
        tap (
          (categories: ExpenditureCategory[]) => {
            this.expCategoriesSubject.next(categories)
          }
        )
      )
  }

  getCategoryById(id: string): Observable<ExpenditureCategory>{
    return this.http.get<ExpenditureCategory>(`/api/expCategories/${id}`)
  }

  createExpCategory(name: string): Observable<ExpenditureCategory>{
    return this.http.post<ExpenditureCategory>('/api/expCategories', {name})
  }

  updateExpCategoryName(name: string, id: string): Observable<ExpenditureCategory>{
    return this.http.put<ExpenditureCategory>(`/api/expCategories/${id}`, {name})
  }

  deleteCategory(id: string): Observable<{message: string}>{
    return this.http.delete<{message: string}>(`/api/expCategories/${id}`)
  }

}
