import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';


@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent implements OnInit {
  
  account_id: string = "";
  currentReportData: any = [];
  toShow: Boolean = false;
  searchParam = "";
  docHeader = "";
  monthArray = {
    '01':'Jan',
    '02':'Feb',
    '03':'Mar',
    '04':'Apr',
    '05':'May',
    '06':'Jun',
    '07':'Jul',
    '08':'Aug',
    '09':'Sep',
    '10':'Oct',
    '11':'Nov',
    '12':'Dec'
  };

  constructor(private _loginService: LoginServiceService, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.account_id = this.route.snapshot.params.account_id;
    this.docHeader = this.monthArray[this.route.snapshot.params.month]+' '+this.route.snapshot.params.year;
    this.searchParam = this.route.snapshot.params.year+"-"+this.route.snapshot.params.month;
    console.log(this.searchParam);
    this.createPrintView();
  }

  createPrintView() {
    let reqParam = {
      account_id: this.account_id,
      yearMonth: this.searchParam
    }
    this.spinner.show();
    this._loginService.getMonthlyReportData(reqParam).subscribe((data) => {
      this.spinner.hide();
      if (data.body['status'] === 200) {
        this.currentReportData = data.body['response'];
        console.log(this.currentReportData);
        this.toShow = true;
        if(data.body['response']['likes'].length === 0 && data.body['response']['messages'].length === 0) {
          alert('No record found for a Month '+this.searchParam+' in both likes and messages');
        }
      } else {
        alert('Try Again to generate report');
      }
    });
  }
}
