import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from "./layouts/auth/auth.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {MainComponent} from "./layouts/main/main.component";
import {AccountsComponent} from "./components/accounts/accounts.component";

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
      {path: 'accounts', component: AccountsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
