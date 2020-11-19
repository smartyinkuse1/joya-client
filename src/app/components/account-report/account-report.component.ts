import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';
import { NgxMonthYearSelectorModule } from 'ngx-month-year-selector';

@Component({
  selector: 'app-account-report',
  templateUrl: './account-report.component.html',
  styleUrls: ['./account-report.component.css']
})
export class AccountReportComponent implements OnInit {

  accountList: any = [];

  isMonthSelected = false;

  year = '';
  month = '';

  // tslint:disable-next-line: variable-name
  constructor(private _loginService: LoginServiceService) { }

  ngOnInit() {
    this._loginService.currentMessage.subscribe(message => {
      this.accountList = message;
    });
  }

  onMonthSelection(e: NgxMonthYearSelectorModule) {
    console.log(e);
    this.year = e['year'];
    this.month = e['month']+1; //month staarts form 0-JAN and ends on 11-DEC
    this.isMonthSelected = true;
  }

}
