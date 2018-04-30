import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { MessagesComponent } from "./messages/messages.component";

const APP_ROUTES: Routes = [
  {path: '', redirectTo: '/messages', pathMatch: 'full'},
  {path: 'messages', component: MessagesComponent},
  {path: 'auth', component: AuthComponent, loadChildren:'./auth/auth.module#AuthModule'}
]

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
