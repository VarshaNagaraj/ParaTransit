import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {SQLite} from "@ionic-native/sqlite";
//------ plugins added ----//
import { Geolocation } from '@ionic-native/geolocation';
import { DriverPage } from '../pages/driver/driver';
import { RiderPage } from '../pages/rider/rider';
import { ModalPage } from '../pages/modal/modal';
import { SignupPage } from '../pages/signup/signup';
// modules//
import {LoginPageModule} from '../pages/login/login.module';
import { DriverPageModule } from '../pages/driver/driver.module';
import { RiderPageModule } from '../pages/rider/rider.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { ModalPageModule } from '../pages/modal/modal.module';
import { DatabaseProvider } from '../providers/database/database';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { FactoryProvider } from '../providers/factory/factory';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import {IonicStorageModule} from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage 
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule,
    LoginPageModule,
    SignupPageModule,
    DriverPageModule,
    RiderPageModule,
    ModalPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    DriverPage,
    RiderPage,
    ModalPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationTrackerProvider,
    Geolocation,
    SocialSharing,
    BackgroundGeolocation,
    SQLite,
    SMS,
    DatabaseProvider,
    LocationTrackerProvider,
    FactoryProvider,
    LocationAccuracy
    
    
  ]
})
export class AppModule {}
