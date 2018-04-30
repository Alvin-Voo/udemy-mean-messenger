import { EventEmitter } from "@angular/core";
import { Error } from "./error.model";

export class ErrorService{
  errorOccured = new EventEmitter<Error>();

  handleError(error: any){
    console.log("handle error "+ error.title);
    const errorData = new Error(error.title, error.error.message);
    this.errorOccured.emit(errorData);
  }

}
