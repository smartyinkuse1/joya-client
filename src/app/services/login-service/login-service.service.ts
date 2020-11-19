import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  headerOptions: any = null
  api = 'https://joya-insta.herokuapp.com'
  _isLoggedIn: boolean = false
  accountList: any =[];

  authSub = new Subject<any>();

  private messageSource = new  BehaviorSubject(this.accountList);

  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  constructor(private _http: HttpClient) {
  }

  loginAuth(userObj: any) {
    if (userObj.authcode) {
      console.log('Appending headers');
      this.headerOptions = new HttpHeaders({
        'x-tfa': userObj.authcode
      });
    }
    return this._http.post(this.api +"/login", { uname: userObj.uname, upass: userObj.upass }, { observe: 'response', headers: this.headerOptions });
  }

  setupAuth() {
    return this._http.post(this.api+"/tfa/setup", {user_id: localStorage.getItem('user_id'), email: localStorage.getItem('email')}, { observe: 'response' })
  }

  registerUser(userObj: any) {
    return this._http.post(this.api+"/register", { uname: userObj.uname, upass: userObj.upass }, { observe: "response" });
  }

  updateAuthStatus(value: boolean) {
    this._isLoggedIn = value
    this.authSub.next(this._isLoggedIn);
    localStorage.setItem('isLoggedIn', value ? "true" : "false");
  }

  getAuthStatus() {
    this._isLoggedIn = localStorage.getItem('isLoggedIn') == "true" ? true : false;
    return this._isLoggedIn
  }

  logoutUser() {
    this._isLoggedIn = false;
    this.authSub.next(this._isLoggedIn);
    localStorage.setItem('isLoggedIn', "false")
  }

  getAuth() {
    // tslint:disable-next-line: max-line-length
    //return this._http.get("/api/tfa/setup", {user_id: localStorage.getItem('user_id'), email: localStorage.getItem('email')}, { observe: 'response' });
    return this._http.post(this.api+"/tfa/setup/check", {user_id: localStorage.getItem('user_id'), email: localStorage.getItem('email')}, { observe: 'response' });
  }

  deleteAuth() {
    return this._http.delete(this.api+"/tfa/setup", { observe: 'response' });
  }

  verifyAuth(token: any) {
    return this._http.post(this.api+"/tfa/verify", { token: token, user_id: localStorage.getItem('user_id'), email: localStorage.getItem('email') }, { observe: 'response' });
  }

  addAccount(userObj: any){
    return this._http.post(this.api+"/api/accounts/add", userObj, { observe: "response" });
  }

  editAccount(userObj: any){
    return this._http.post(this.api+"/api/accounts/edit", userObj, { observe: "response" });
  }

  getAccountList() {
    return this._http.get(this.api+"/api/accounts/list/"+localStorage.getItem('user_id'), { observe: "response" });
  }
  
  getPkStatus(accountId: string) {
    return this._http.get(this.api+"/api/accounts/pk/status/"+accountId, { observe: "response" });
  }

  setUpInstagramAccount(account_id: any) {
    return this._http.post(this.api+
      '/api/accounts/instagram/setup',
       {
         account_id: account_id,
         user_id: localStorage.getItem('user_id')
        },
        {
          observe: 'response'
        }
      );
  }

  getFollowers(account_id: any) {
    return this._http.get(this.api+"/api/accounts/instagram/followers/"+account_id, { observe: "response" });
  }

  getReportData(account_id: any) {
    return this._http.get(this.api+"/api/accounts/report/"+account_id, { observe: "response" });
  }

  getMonthlyReportData(reqParam: any) {
    return this._http.get(this.api+"/api/accounts/report/monthly/"+reqParam.account_id+"/"+reqParam.yearMonth, { observe: "response" });
  }

}