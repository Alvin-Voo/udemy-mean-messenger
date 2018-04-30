import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from "./app.component";
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { ErrorComponent } from './errors/error.component';
import { ErrorService } from './errors/error.service';
import { MessageModule } from './messages/message.module';

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        HeaderComponent,
        ErrorComponent
    ],
    imports: [BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      //Auth Module is loaded lazily
      MessageModule
    ],
    providers: [AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
