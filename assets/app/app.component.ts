import { Component, OnInit, isDevMode } from '@angular/core';
import { Message } from './messages/message.model';
import { MessageService } from './messages/message.service';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private messageService: MessageService, private authService: AuthService){}

  ngOnInit(){
    if(!isDevMode()){
      console.log("its production mode!");
      this.messageService.setDomain("https://udemy-mean-messenger.herokuapp.com");
      this.authService.setDomain("https://udemy-mean-messenger.herokuapp.com");
    }
  }
}
