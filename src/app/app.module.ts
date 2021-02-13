import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewControlComponent } from './components/view-control/view-control.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MsalInterceptor, MsalModule } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';


const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
@NgModule({
  declarations: [
    AppComponent,
    ViewControlComponent
  ],
  imports: [
	MatCardModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MsalModule.forRoot({
      auth: {
        clientId: environment.clientId, // This is your client ID
        authority: environment.authority, // This is your tenant ID
        redirectUri: environment.redirectUri// This is your redirect URI
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      },
    }, {
      popUp: !isIE,
      consentScopes: [
        'user.read',
        'openid',
        'profile',
      ],
      unprotectedResources: [],
      protectedResourceMap: [
        [environment.protectedResourceMap, ['user.read']]
      ],
      extraQueryParameters: {}
    }),
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    ToastrModule.forRoot({
      timeOut: environment.timeToast,
      disableTimeOut: false,
      positionClass: 'toast-top-full-width',
      closeButton: true,
      progressAnimation: 'increasing',
      progressBar: true,
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
