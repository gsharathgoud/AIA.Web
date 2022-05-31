import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SharedDataAccessModule } from '@aia.web/shared/data-access';
import { SharedFeatureModule } from '@aia.web/shared/feature';
import { SharedUiModule } from '@aia.web/shared/ui';
import { SharedUtilsModule } from '@aia.web/shared/utils';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { I18nModule } from '../i18n/i18n.module';
import { ReportsComponent } from './reports/reports.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { VisualComponent } from './visual/visual.component';
@NgModule({
  declarations: [
    AppComponent,
    ReportsComponent,
    LoginComponent,
    HeaderComponent,
    PageNotFoundComponent,
    FooterComponent,
    HomeComponent,
    VisualComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedDataAccessModule,
    SharedFeatureModule,
    SharedUiModule,
    SharedUtilsModule,
    I18nModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
