import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ToggleComponent } from './components/shared/toggle/toggle.component';
import { MenuSettingsComponent } from './components/shared/header/menu-settings/menu-settings.component';
import { MessageComponent } from './components/shared/message/message.component';
import { MenuCartComponent } from './components/shared/header/menu-cart/menu-cart.component';
import { NotificationComponent } from './components/shared/notification/notification.component';
import { ButtonComponent } from './components/shared/button/button.component';
import { ButtonLinkComponent } from './components/shared/button-link/button-link.component';
import { InputComponent } from './components/shared/input/input.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ResetComponent } from './components/reset/reset.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserTokenInterceptor } from './interceptors/user-token.interceptor';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ToggleComponent,
    MenuSettingsComponent,
    MessageComponent,
    MenuCartComponent,
    NotificationComponent,
    ButtonComponent,
    ButtonLinkComponent,
    InputComponent,
    RegisterComponent,
    LoginComponent,
    ResetComponent,
    ProfileComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: UserTokenInterceptor, 
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
