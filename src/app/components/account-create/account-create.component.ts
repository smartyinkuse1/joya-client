import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css']
})
export class AccountCreateComponent implements OnInit {
  
  newUserObj = {
    user_id: localStorage.getItem('user_id'),
    name: "",
    type: "",
    contact_name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    message1: "",
    message2: "",
    message3: "",
    message4: "",
    message5: ""
  };
  errorMessage: string = null;

  constructor( private _loginService: LoginServiceService, private _router: Router, private spinner: NgxSpinnerService ) { }

  ngOnInit() {
    console.log(localStorage.getItem('user_id'));
  }

  createNewUser() {
    console.log('form submitted', this.newUserObj);
    this.spinner.show();
    if (this.validateFields()) { // all fields aare validated
      this._loginService.addAccount(this.newUserObj).subscribe((data) => {
        this.errorMessage = null;
        console.log(data);
        if (data.body['status'] === 200) {
          this.spinner.hide();
          alert('Account created successfully. Now starting Instagram setup...');
          this.setupInstagram(data.body['response']['account_id']);
        }
        if (data.body['status'] === 400) {
          this.spinner.hide();
          alert(data.body['message']);
          this.errorMessage = data.body['message'];
        }
      });
      console.log(this.validateFields());
    } else {
      this.spinner.hide();
      alert('All fields are required');
    }
  }

  validateFields() {
    let status = false;
    for (let key in this.newUserObj) {
      if (this.newUserObj.hasOwnProperty(key)) {
        if (this.newUserObj[key].trim().length < 1) {
          status = false;
          break;
        } else {
          status = true;
        }
      }
   }
    return status;
  }

  setupInstagram(account_id: any) {
    this.spinner.show();
    this._loginService.setUpInstagramAccount(account_id).subscribe((data) => {
      this.errorMessage = null;
      console.log(data);
      if (data.body['status'] === 200) {
        this.spinner.hide();
        alert('Instagram setup completed.');
        location.reload();
      }
      if (data.body['status'] === 409) {
        this.spinner.hide();
        alert('Instagram setup failed try again Setup in ' + this.newUserObj.username +  ' dashboard.');
        location.reload();
      }
      if (data.body['status'] === 400) {
        this.spinner.hide();
        alert(data.body['message']);
        location.reload();
      }
    });
  }
}
