import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from "./layouts/auth/auth.component";
import { LoginComponent} from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { MainComponent } from "./layouts/main/main.component";
import { AccountsComponent } from "./components/accounts/accounts.component";
import { CreateAccountComponent } from "./components/create-account/create-account.component";
import { ExpenditureComponent } from "./components/expenditure/expenditure.component";
import { AuthGuard } from "./shared/auth.guard";
import { ExpenditureEditComponent } from "./components/expenditure/expenditure-edit/expenditure-edit.component";
import {CreateExpenditureComponent} from "./components/expenditure/create-expenditure/create-expenditure.component";
import {GainsComponent} from "./components/gains/gains.component";
import {CreateGainCategoryComponent} from "./components/gains/create-gain-category/create-gain-category.component";
import {CreateGainItemComponent} from "./components/gains/create-gain-item/create-gain-item.component";
import {OverviewsComponent} from "./components/overviews/overviews.component";
import {GainsReportComponent} from "./components/overviews/gains-report/gains-report.component";
import {ExpReportComponent} from "./components/overviews/exp-report/exp-report.component";
import {BalanceReportComponent} from "./components/overviews/balance-report/balance-report.component";
import {MainOverviewsComponent} from "./components/overviews/main-overviews/main-overviews.component";
import {DateFormComponent} from "./components/overviews/date-form/date-form.component";
import {GraphReportComponent} from "./components/overviews/graph-report/graph-report.component";
import {TableReportComponent} from "./components/overviews/table-report/table-report.component";
import {GraphComponent} from "./components/overviews/balance-report/graph/graph.component";

const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: RegisterComponent},
    ]
  },
  {
    path: '', component: MainComponent, children: [
      {path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard]},
      {path: 'create-account', component: CreateAccountComponent, canActivate: [AuthGuard]},
      {path: 'expenditure', component: ExpenditureComponent, canActivate: [AuthGuard]},
      {path: 'edit-account/:id', component: CreateAccountComponent, canActivate: [AuthGuard]},
      {path: 'edit-expCategory/:id', component: ExpenditureEditComponent, canActivate: [AuthGuard]},
      {path: 'create-expCategory', component: ExpenditureEditComponent, canActivate: [AuthGuard]},
      {path: 'create-expenditure', component: CreateExpenditureComponent, canActivate: [AuthGuard]},
      {path: 'edit-expenditure/:id', component: CreateExpenditureComponent, canActivate: [AuthGuard]},
      {path: 'gains', component: GainsComponent, canActivate: [AuthGuard]},
      {path: 'create-gainCategory', component: CreateGainCategoryComponent, canActivate: [AuthGuard]},
      {path: 'edit-gainCategory/:id', component: CreateGainCategoryComponent, canActivate: [AuthGuard]},
      {path: '', component: OverviewsComponent, canActivate: [AuthGuard], children: [
          {path: 'overviews', component: MainOverviewsComponent, canActivate: [AuthGuard]},
          {path: 'gains-report', component: GainsReportComponent, canActivate: [AuthGuard]},
          {path: 'exp-report', component: ExpReportComponent, canActivate: [AuthGuard]},
          {path: 'balance-report', component: BalanceReportComponent, canActivate: [AuthGuard]},
          {path: 'balance-report/:id', component: BalanceReportComponent, canActivate: [AuthGuard]},
          {path: 'date-form', component: DateFormComponent, canActivate: [AuthGuard]},
          {path: 'date-form/:id', component: DateFormComponent, canActivate: [AuthGuard], pathMatch: 'full'},

          //экспериментирую с отображением отчетов
          {path: 'graph-report', component: GraphReportComponent, canActivate: [AuthGuard]},
          {path: 'graph-report/:id', component: GraphReportComponent, canActivate: [AuthGuard]},
          {path: 'table-report', component: TableReportComponent, canActivate: [AuthGuard]},
          {path: 'table-report/:id', component: TableReportComponent, canActivate: [AuthGuard]},
          {path: 'graph', component: GraphComponent, canActivate: [AuthGuard]},
        ]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
