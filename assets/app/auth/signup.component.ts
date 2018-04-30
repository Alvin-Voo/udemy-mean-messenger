import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit{
  myForm: FormGroup;

  constructor(private authService : AuthService){}

  ngOnInit(){
    this.myForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null,
        Validators.required
      )
    })
  }

  onSubmit(){
    const user = new User(
      this.myForm.value.email,
      this.myForm.value.password,
      this.myForm.value.firstName,
      this.myForm.value.lastName
    )
    this.authService.signup(user)
    .subscribe(
      result => console.log(result),
      error => console.log(error)
    )
    this.myForm.reset();
  }
}
