import { User } from "./user.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErrorService } from "../errors/error.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService{

  constructor(private httpClient: HttpClient, private errorService: ErrorService){}

  signup(user: User){
    return this.httpClient.post('http://localhost:3000/user',user,
    {headers:{'Content-Type':'application/json'}, responseType: 'json', observe: 'body'})
    .catch(
      (errResp: HttpErrorResponse)=>{
        this.errorService.handleError(errResp.error);
        return Observable.throw(errResp);//throw for component to handle
      }
    );
  }

  signin(user: User){
    return this.httpClient.post('http://localhost:3000/user/signin',user,
    {headers:{'Content-Type':'application/json'}, responseType: 'json', observe: 'body'})
    .catch(
      (errResp: HttpErrorResponse)=>{
        this.errorService.handleError(errResp.error);
        return Observable.throw(errResp);//throw for component to handle
      }
    );
  }

  logout(){
    localStorage.clear();
  }

  isLoggedIn(){
    return localStorage.getItem('token') !== null;
  }
}
