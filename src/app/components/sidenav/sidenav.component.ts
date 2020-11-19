import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  isUserLoggedIn: boolean = false;
  accountViewStatus: boolean = false;
  accountList: any;

  constructor(private _loginService: LoginServiceService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
            // Show loading indicator
        }

        if (event instanceof NavigationEnd) {
            // Hide loading indicator
            this.getAuthDetails();
        }

        if (event instanceof NavigationError) {
            // Hide loading indicator
            // Present error to user
            console.log(event.error);
        }
    });
  }

  ngOnInit() {
    this.getAuthDetails();
    this.getAccountList();
  }

  getAuthDetails() {
    this.isUserLoggedIn = this._loginService.getAuthStatus();
  }

  getAccountList() {
    this._loginService.getAccountList().subscribe((data) => {
      console.log(data);
      if (data.body['status'] === 200) {
        this.accountList = data.body['response'];
        this._loginService.changeMessage(this.accountList);
      }
    });
  }

  redirectUserTo(acccountObj: any) {
    console.log(acccountObj);
    this.router.navigate(['/accounts/edit/'+acccountObj.account_id]);
  }

  redirectUserToCreate(){
    this.router.navigate(['account/create']);
  }

  redirectUserToReport(){
    this.router.navigate(['account/report']);
  }

  toogleAccounts() {
    this.accountViewStatus = !this.accountViewStatus;
  }
}
