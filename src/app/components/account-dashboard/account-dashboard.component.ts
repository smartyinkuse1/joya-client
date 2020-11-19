import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.css']
})
export class AccountDashboardComponent implements OnInit {

  account_id: string = "";
  account_details: any;
  errorMessage: string = "";
  isPkAvailable: boolean = false;
  followerList: any;
  todayLikeDelivery: any;
  previousLikeDelivery: any;
  todayMessageDelivery: any;
  previousMessageDelivery: any;
  // future filter crieteria
  futureFilterArgs = {
    like_provided: 0,
    cron_status: 0
  };
  // previous related crieteria like_time||message_time<todays_date (yyyy-mm-dd) && (like_count&&message_count)>0
  previousFilterArgs = {
    like_provided: 'check',
    message_count: 'check',
    like_time: new Date(),
    message_time: new Date()
  };
  // Todays related crieteria like_time||message_time===todays_date (yyyy-mm-dd) && (like_count&&message_count)>0
  todayFilterArgs = {
    like_provided: 'check',
    message_count: 'check',
    like_time: new Date(),
    message_time: new Date()
  };
  // tslint:disable-next-line: variable-name
  global_account_type = [
    {
      type: 'sampler',
      likes: 25,
      messages: 5,
    },
    {
      type: 'small',
      likes: 100,
      messages: 15,
    },
    {
      type: 'medium',
      likes: 200,
      messages: 25,
    },
    {
      type: 'large',
      likes: 300,
      messages: 50,
    }
  ];



  constructor(private _loginService: LoginServiceService, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.account_id = this.route.snapshot.params.account_id;
    this.checkPkStatus();

  }
  checkPkStatus() {
    this._loginService.getPkStatus(this.account_id).subscribe((data) => {
      console.log(data);
      this.errorMessage = null;
      let res = data.body['response'];
      if (data.body['status'] === 200) {
        if (res[0]['pk'] === null) {
          this.isPkAvailable = false;
          this.account_details = res[0];
        } else {
          this.isPkAvailable = true;
          this.account_details = res[0];
          this.getFollowerList();
        }
      }
    });
  }
  
  getFollowerList() {
    console.log("im here");
    
    this.spinner.show();
    this._loginService.getFollowers(this.account_id).subscribe((data) => {
      console.log(data);
      this.spinner.hide();
      if (data.body['status'] === 200) {
        this.followerList = data.body['response'];
        let todayDate = new Date().getFullYear()+'-'+("0"+(new Date().getMonth()+1)).slice(-2)+'-'+("0"+new Date().getDate()).slice(-2);
        let tLike = [];
        let tMessage = [];
        let pLike = [];
        let pMessage = [];
        this.followerList.forEach( function(item) {
          if (item['like_provided']>0) {
            //divide between previous/today like array
            if (todayDate === item['like_date']) {
              tLike.push(item);
            } else {
              pLike.push(item);
            }
          }
          if (item['cron_status']>0) {
            if (todayDate === item['message_date']) {
              tMessage.push(item);
            } else {
              pMessage.push(item);
            }
          }
        });
        this.todayLikeDelivery = tLike;
        this.todayMessageDelivery = tMessage;
        this.previousLikeDelivery = pLike;
        this.previousMessageDelivery = pMessage;

      } else {
        alert(data.body['messages']);
      }
    });
  }

  setupInstagram() {
    this.spinner.show();
    this._loginService.setUpInstagramAccount(this.account_id).subscribe((data) => {
      this.errorMessage = null;
      if (data.body['status'] === 200) {
        this.spinner.hide();
        alert('Instagram setup completed.');
        location.reload();
      }
      if (data.body['status'] === 409) {
        this.spinner.hide();
        alert('Retry setup again');
      }
      if (data.body['status'] === 400) {
        this.spinner.hide();
        alert(data.body['message']);
        location.reload();
      }
    });
  }

}
