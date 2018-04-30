import { Component, OnInit } from "@angular/core";
import { MessageService } from "./message.service";
import { Message } from "./message.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',

})

export class MessageInputComponent implements OnInit{
  message: Message;
  constructor(private messageService: MessageService){}

  ngOnInit(){
      this.messageService.messageIsEdit.subscribe(
        (message) =>{
          this.message = message;//if the object assigned is exactly the same the next time, it wont get re-assigned again
          //so have to assign to null after clearing the input field from template
        }
      );
  }

  onSubmit(form: NgForm){
    console.log(form);
    if(this.message){//in edit mode
      this.message.content = form.value.content; //ngModel binding seems to work last
      //as long as the binding properties is changed, it will update LAST, even after the form is resetted
      //event flow: onSubmit triggerd -> message property updated -> form control reset -> view changed (form control value is null) -> property binding effect (form control value got populated again)
      this.messageService.updateMessage(this.message)
      .subscribe(
        result => console.log(result),
        err => console.log(err)
      )

      this.message = null;

    }else{
      this.messageService.addMessage(new Message(form.value.content,'Alvin')).subscribe(
          data => console.log(data), //data should be type HttpResponse
          error => console.log(error)
      );
    }

    form.reset();
  }

  onClear(form: NgForm){
    this.message = null;
    form.reset();
  }
}
