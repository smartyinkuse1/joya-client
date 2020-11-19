import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountCreateComponent } from './components/account-create/account-create.component';
import { AccountDashboardComponent } from './components/account-dashboard/account-dashboard.component';
import { AccountEditComponent } from './components/account-edit/account-edit.component';
import { AccountReportComponent } from './components/account-report/account-report.component';
import { ReportViewComponent } from './components/report-view/report-view.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardGuard } from './guards/AuthGuard/auth-guard.guard';
import { LoginGuard } from './guards/Login/login.guard';

const routes: Routes = [
  { path: "", redirectTo: '/login', pathMatch: 'full', canActivate: [LoginGuard] },
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  { path: "home", component: HomeComponent, canActivate: [AuthGuardGuard] },
  { path: "register", component: RegisterComponent, canActivate: [LoginGuard] },
  {path:"account/create", component:AccountCreateComponent, canActivate: [AuthGuardGuard]},
  {path:"account/edit/:account_id", component:AccountEditComponent, canActivate: [AuthGuardGuard]},
  {path:"account/dashboard/:account_id", component:AccountDashboardComponent, canActivate: [AuthGuardGuard]},
  {path:"account/report", component:AccountReportComponent, canActivate: [AuthGuardGuard]},
  {path:"account/report-view/:account_id/:year/:month", component:ReportViewComponent, canActivate: [AuthGuardGuard]},
  { path: "**", redirectTo: '/login', pathMatch: 'full', canActivate: [LoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
