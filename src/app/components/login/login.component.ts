import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  tfaFlag: boolean = false
  userObject: any= {
    uname: "",
    upass: "",
    authCode: ""
  }
  authcode: any
  errorMessage: string = null
  constructor(private _loginService: LoginServiceService, private _router: Router) {
  }

  ngOnInit() {
  }

  loginUser() {
    console.log(this.userObject);
    
    this._loginService.loginAuth(this.userObject).subscribe((data) => {
      this.errorMessage = null;
      console.log(data);
      if (data.body['status'] === 200) {
        this._loginService.updateAuthStatus(true);
        localStorage.setItem('user_id', data.body['data'].user_id);
        localStorage.setItem('email', data.body['data'].email);
        this._router.navigateByUrl('/home');
      }
      if (data.body['status'] === 206) {
        this.tfaFlag = true;
      }
      if (data.body['status'] === 403) {
        this.errorMessage = data.body['message'];
      }
      if (data.body['status'] === 404) {
        this.errorMessage = data.body['message'];
      }
    })
  }

}
