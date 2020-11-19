import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FuturePipe } from './shared/future.pipe';
import { PreviousPipe } from './shared/previous.pipe';
import { TodayPipe } from './shared/today.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginServiceService } from './services/login-service/login-service.service';
import { AccountCreateComponent } from './components/account-create/account-create.component';
import { AccountDashboardComponent } from './components/account-dashboard/account-dashboard.component';
import { AccountEditComponent } from './components/account-edit/account-edit.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AccountReportComponent } from './components/account-report/account-report.component';
import { MessageFilter } from './shared/message.pipe';
import { ReportViewComponent } from './components/report-view/report-view.component';
import { NgxMonthYearSelectorModule } from 'ngx-month-year-selector';
// import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
// import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

@NgModule({
  declarations: [
    FuturePipe,
    PreviousPipe,
    TodayPipe,
    MessageFilter,
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    AccountCreateComponent,
    AccountDashboardComponent,
    AccountEditComponent,
    SidenavComponent,
    AccountReportComponent,
    ReportViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxMonthYearSelectorModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAnalyticsModule
  ],
  providers: [LoginServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
