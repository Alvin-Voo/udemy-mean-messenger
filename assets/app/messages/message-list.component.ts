import { Component, OnInit } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.service";


@Component({
  selector: 'app-message-list',
  template: `
    <div class="col-md-8 col-md-offset-2">
      <app-message [message]="message"
      *ngFor="let message of messages"></app-message>
    </div>
  `,
})
export class MessageListComponent implements OnInit{
  messages: Message[];

  constructor(private messageService: MessageService){}

  ngOnInit(){
    this.messageService.getMessage().subscribe(
      (messages: Message[]) => this.messages = messages,
      (err) => console.log(err)
    );//this is by reference, so any changes to the messages in service will be reflected in messages here
  }

}
