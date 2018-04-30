import { User } from "./user.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable} from "@angular/core";
import { ErrorService } from "../errors/error.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {
  private DOMAIN = 'http://localhost:3000';

  constructor(private httpClient: HttpClient, private errorService: ErrorService){}

  setDomain(domain){
    this.DOMAIN = domain;
  }

  signup(user: User){
    return this.httpClient.post(this.DOMAIN+'/user',user,
    {headers:{'Content-Type':'application/json'}, responseType: 'json', observe: 'body'})
    .catch(
      (errResp: HttpErrorResponse)=>{
        this.errorService.handleError(errResp.error);
        return Observable.throw(errResp);//throw for component to handle
      }
    );
  }

  signin(user: User){
    return this.httpClient.post(this.DOMAIN+'/user/signin',user,
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
