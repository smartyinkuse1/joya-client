import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMessage: string = null
  successMessage: string = null;

  userObject = {
    uname: "",
    upass: ""
  }

  confirmPass: string = ""

  constructor(private _loginService: LoginServiceService, private _router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    if (this.userObject.uname.trim() !== "" && this.userObject.upass.trim() !== "" && (this.userObject.upass.trim() === this.confirmPass)){
      this._loginService.registerUser(this.userObject).subscribe((data) => {
        const result = data.body
        if (result['status'] === 200) {
          this.successMessage = result['message'];
          this.errorMessage = null;
          setTimeout(() => {
            this._router.navigate(['/login']);
          }, 2000);
        } else {
          if(result['status'] === 400) {
            this.errorMessage = result['message'];
            this.successMessage =null;
          }
        }
      });
    }
  }
}
