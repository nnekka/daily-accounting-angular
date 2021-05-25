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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
