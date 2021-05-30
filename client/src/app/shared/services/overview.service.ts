import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Expenditure, Gain} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  constructor(
    private http: HttpClient
  ){}

  getTotalGains(startDate: Date, endDate: Date): Observable<Gain[]>{
    const queryParams = `?startDate=${startDate}&endDate=${endDate}`
    return this.http.get<Gain[]>('/api/overviews/gains' + queryParams)
  }

  getAccountGains(startDate: Date, endDate: Date, accountId: string): Observable<Gain[]>{
    const queryParams = `?startDate=${startDate}&endDate=${endDate}`
    return this.http.get<Gain[]>(`/api/overviews/gains/${accountId}` + queryParams)
  }

  getTotalExpendirures(startDate: Date, endDate: Date): Observable<Expenditure[]>{
    const queryParams = `?startDate=${startDate}&endDate=${endDate}`
    return this.http.get<Expenditure[]>('/api/overviews/expenditures' + queryParams)
  }

  getAccountExpenditures(startDate: Date, endDate: Date, accountId: string): Observable<Expenditure[]>{
    const queryParams = `?startDate=${startDate}&endDate=${endDate}`
    return this.http.get<Expenditure[]>(`/api/overviews/expenditures/${accountId}` + queryParams)
  }



}
