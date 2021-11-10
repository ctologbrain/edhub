import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientInterceptor } from './_core/interceptors/http-client.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpTokenInterceptor } from './_core/interceptors/http-token.interceptor';
import { HttpLogInterceptor } from './_core/interceptors/http-log.interceptor';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from 'angularx-social-login';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    SocialLoginModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpLogInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    HttpClientInterceptor,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClient),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.facbookClient),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
