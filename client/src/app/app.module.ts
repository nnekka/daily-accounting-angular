import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './layouts/auth/auth.component';
import { MainComponent } from './layouts/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AngularMaterialModule } from "./angular-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ErrorComponent} from "./components/error/error.component";
import { ErrorInterceptor} from "./error.interceptor";
import { AccountsComponent} from "./components/accounts/accounts.component";
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { TokenInterceptor } from "./shared/token.interceptor";
import { ExpenditureComponent } from './components/expenditure/expenditure.component';
import { ExpenditureListComponent } from './components/expenditure/expenditure-list/expenditure-list.component';
import { ExpenditureEditComponent } from './components/expenditure/expenditure-edit/expenditure-edit.component';
import { CreateExpenditureComponent } from './components/expenditure/create-expenditure/create-expenditure.component';
import { GainsComponent } from './components/gains/gains.component';
import { GainsCategoriesComponent } from './components/gains/gains-categories/gains-categories.component';
import { CreateGainCategoryComponent } from './components/gains/create-gain-category/create-gain-category.component';
import { CreateGainItemComponent } from './components/gains/create-gain-item/create-gain-item.component';
import { OverviewsComponent } from './components/overviews/overviews.component';
import { GainsReportComponent } from './components/overviews/gains-report/gains-report.component';
import { ExpReportComponent } from './components/overviews/exp-report/exp-report.component';
import { BalanceReportComponent } from './components/overviews/balance-report/balance-report.component';
import { MainOverviewsComponent } from './components/overviews/main-overviews/main-overviews.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    AccountsComponent,
    ErrorComponent,
    CreateAccountComponent,
    ExpenditureComponent,
    ExpenditureListComponent,
    ExpenditureEditComponent,
    CreateExpenditureComponent,
    GainsComponent,
    GainsCategoriesComponent,
    CreateGainCategoryComponent,
    CreateGainItemComponent,
    OverviewsComponent,
    GainsReportComponent,
    ExpReportComponent,
    BalanceReportComponent,
    MainOverviewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: ErrorInterceptor
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]

})
export class AppModule { }
