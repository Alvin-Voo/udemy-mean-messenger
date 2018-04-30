import { Component } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AuthService } from "./auth.service";
import { User } from "./user.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signin.component.html'
})

export class SigninComponent{
  myForm: FormGroup;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.myForm = new FormGroup({
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
    this.authService.signin(new User(this.myForm.value.email, this.myForm.value.password))
    .subscribe(
      (data)=>{
        localStorage.setItem('token',data['token']);
        localStorage.setItem('userId',data['userId']);
        this.router.navigateByUrl('/');
      },
      err => console.log(err)
    )
    this.myForm.reset();
  }
}
