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
    ExpenditureEditComponent
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
