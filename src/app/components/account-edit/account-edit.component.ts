import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {
  account_id: string = "";

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
    message5: "",
    account_id: ""
  };

  accountList: any = [];

  errorMessage: string = null;

  constructor(private _loginService: LoginServiceService, private _router: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.account_id = this._router.snapshot.params.account_id;
    this._loginService.currentMessage.subscribe(message => {
      this.accountList = message;
      console.log(this.accountList);
      if (this.accountList.length > 0) {
        this.accountList.forEach(element => {
            if (element.account_id === this.account_id) {
              this.newUserObj = {
                user_id: localStorage.getItem('user_id'),
                name: element.name,
                type: element.type,
                contact_name: element.contact_name,
                email: element.email,
                phone: element.phone,
                username: element.username,
                password: element.password,
                message1: element.message1,
                message2: element.message2,
                message3: element.message3,
                message4: element.message4,
                message5: element.message5,
                account_id: element.account_id
              };
            }
        });
      }
    });
  }

  editUser() {
    console.log('form updated', this.newUserObj);
    this.spinner.show();
    if (this.validateFields()) { // all fields aare validated
      this._loginService.editAccount(this.newUserObj).subscribe((data) => {
        this.errorMessage = null;
        console.log(data);
        if (data.body['status'] === 200) {
          this.spinner.hide();
          alert('Account updated successfully.');
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

}
