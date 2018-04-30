import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Message } from "./message.model";
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as DOMAIN from '../config/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
import { ErrorService } from '../errors/error.service';

@Injectable()
export class MessageService{
  private messages: Message[] = [];
  messageIsEdit = new EventEmitter<Message>();

  constructor(private httpClient: HttpClient, private errorService: ErrorService){}

  addMessage(message: Message){
    // const body = JSON.stringify(message); //there's no need to stringify coz the method will help to convert object to json by default
    return this.httpClient.post(DOMAIN.domain+'/message',message,
    {headers: {'Content-Type': 'application/json'},
    params:{'token':localStorage.getItem('token')?localStorage.getItem('token'):''},
    observe: 'body',
    responseType: 'json'})
    .map((respBody)=>{
      this.messages.push(
        new Message(
          respBody['obj']['content']
        ,respBody['obj'].user.firstName //this is retrievable due to a the whole user object was 'saved' or rather 'passed' in the post method
        ,respBody['obj']['_id']
        ,respBody['obj'].user._id));
      return respBody;
    })
    .catch(
      (errResp: HttpErrorResponse)=>{
        this.errorService.handleError(errResp.error);
        return Observable.throw(errResp);//throw for component to handle
      }
    );
  }

  getMessage(){
    return this.httpClient.get(DOMAIN.domain+'/message',//unprotected route
    {observe: 'body', responseType: 'json'})
    .map((respBody)=>{//response body when returned is automatically a javascript object
      let transformedMessages: Message[] = [];
      console.log(respBody['obj']);
      for(let message of respBody['obj']){
        transformedMessages.push(new Message(message.content, message.user.firstName, message._id, message.user._id));
      }
      this.messages = transformedMessages;
      return transformedMessages;
    })
    .catch(
      (errResp: HttpErrorResponse)=>{
        this.errorService.handleError(errResp.error);
        return Observable.throw(errResp);//throw for component to handle
      }
    );
  }

  editMessage(message: Message){
    this.messageIsEdit.emit(message);
  }

  updateMessage(message: Message){
    return this.httpClient.patch(DOMAIN.domain+'/message/'+message.messageId
    ,message
    ,{headers: {'Content-Type': 'application/json'}
    ,params:{'token':localStorage.getItem('token')?localStorage.getItem('token'):''}
    ,observe: 'body', responseType: 'json'})
    .catch(
      (errResp: HttpErrorResponse)=>{
        this.errorService.handleError(errResp.error);
        return Observable.throw(errResp);//throw for component to handle
      }
    );
  }

  deleteMessage(message: Message){
    this.messages.splice(this.messages.indexOf(message),1);
    return this.httpClient.delete(DOMAIN.domain+'/message/'+message.messageId,
    {headers: {'Content-Type': 'application/json'}
    ,params:{'token':localStorage.getItem('token')?localStorage.getItem('token'):''}
    ,observe: 'body', responseType: 'json'})
    .catch(
      (errResp: HttpErrorResponse)=>{
        this.errorService.handleError(errResp.error);
        return Observable.throw(errResp);//throw for component to handle
      }
    );
  }
}
