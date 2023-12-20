import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ToggleComponent } from './components/shared/toggle/toggle.component';
import { MenuSettingsComponent } from './components/shared/header/menu-settings/menu-settings.component';
import { MessageComponent } from './components/shared/message/message.component';
import { MenuCartComponent } from './components/shared/header/menu-cart/menu-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ToggleComponent,
    MenuSettingsComponent,
    MessageComponent,
    MenuCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
