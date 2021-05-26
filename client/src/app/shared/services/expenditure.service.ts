import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Expenditure, ExpenditureCategory} from "../interfaces";
import {Observable} from "rxjs/internal/Observable";
import {tap} from "rxjs/operators";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

@Injectable({
  providedIn: 'root'
})
export class ExpenditureService {

  expCategories: ExpenditureCategory[]
  expCategoriesSubject: BehaviorSubject<ExpenditureCategory[]> = new BehaviorSubject<ExpenditureCategory[]>([])

  expenditures: Expenditure[]
  expenditureSubject: BehaviorSubject<Expenditure[]> = new BehaviorSubject<Expenditure[]>([])

  toRefresh : boolean
  refreshSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(
    private http: HttpClient
  ) {}


  //----------------------------------категории расходов begin-------------------------------------

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
  //----------------------------------категории расходов end-------------------------------------
  //-----------------------------------расходы begin---------------------------------------------

  getExpenditures(): Observable<Expenditure[]>{
    return this.http.get<Expenditure[]>('/api/expenditures')
      .pipe(
        tap (
          (exps: Expenditure[]) => {
            this.expenditureSubject.next(exps)
          }
        )
      )
  }

  getExpenditure(id: string): Observable<Expenditure>{
    return this.http.get<Expenditure>(`/api/expenditures/${id}`)
  }

  addExpenditure(itemPrice: number, description: string, categoryId: string, accountId: string): Observable<Expenditure>{
    return this.http.post<Expenditure>('/api/expenditures', {itemPrice, description, categoryId, accountId})
  }

  updateExpenditure(itemPrice: number, description: string, accountId: string, expId: string): Observable<Expenditure>{
    return this.http.put<Expenditure>(`/api/expenditures/${expId}`, {itemPrice, description, accountId})
  }

  deleteExpenditure(id: string): Observable<{message: string}>{
    return this.http.delete<{message: string}>(`/api/expenditures/${id}`)
  }

  //-----------------------------------расходы end---------------------------------------------

}
