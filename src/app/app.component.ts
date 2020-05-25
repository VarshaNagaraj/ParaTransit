import { Component,ViewChild } from '@angular/core';
import {Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { DriverPage } from '../pages/driver/driver';
import { RiderPage } from '../pages/rider/rider';
import { LoginPage } from '../pages/login/login';
import {SignupPage } from '../pages/signup/signup';
import { DatabaseProvider } from '../providers/database/database';
import { FactoryProvider } from '../providers/factory/factory';
import {Events} from 'ionic-angular';
import {Storage} from '@ionic/storage';
// import { Deeplinks } from '@ionic-native/deeplinks';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  user_name:any;
  rootPage:any = SignupPage;
  @ViewChild(Nav) navChild:Nav;
pages : Array<{title:string,component :any, imageUrl:any}>;
  constructor(public LocalStorage: Storage,public events: Events,public settings: FactoryProvider,public db: DatabaseProvider,public platform: Platform, public statusBar: StatusBar,public splashScreen: SplashScreen) {
    events.subscribe('nav:leave', () => {
      this.checkLeaveActive();
    });
    this.initializeapp();
  }

  initializeapp(){
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.db.initilizeDB();
      //Trying Deeplinks concept

      // this.deeplinks.routeWithNavController(this.navChild, {
      //   '/rider': RiderPage,
      //   '/driver': DriverPage,
      //   '/signin':SignupPage
      //   // '/items/:itemId': ItemDetailsPage
      // }).subscribe((match) => {
      //   console.log('Successfully routed', match);
      // }, (nomatch) => {
      //   console.log('Unmatched Route', nomatch);
      // });
    });
  }

//Side Menu for the Homepage according to their profiles.
  checkLeaveActive(){
    console.log("varsha");
    var user_profile=this.settings.get_userProfile();
     this.user_name = this.settings.get_username();
    if(user_profile=="rider"){
      this.pages =[
        {title: 'My Bookings' , component :  RiderPage, imageUrl:"assets/imgs/clock.png"},
        {title: 'Book Ride' , component :  RiderPage,imageUrl:"assets/imgs/carion.png"},
        {title: 'Emergency Contacts' , component :  RiderPage,imageUrl:"assets/imgs/user.png"},
        {title: 'Support' , component :  RiderPage,imageUrl:"assets/imgs/settings.png"},
        {title: 'About Us' , component :  RiderPage,imageUrl:"assets/imgs/about.png"},
        {title: 'Log-Out', component: LoginPage, imageUrl: "assets/imgs/signout.png"},
      ];
    }
    else if(user_profile=="driver"){
      this.pages =[
        {title: 'Manage Rides' , component :  DriverPage,imageUrl:"assets/imgs/carion.png"},
        {title: 'Cancelled Rides' , component :  DriverPage,imageUrl:"assets/imgs/about.png"},
        {title: 'Support' , component :  DriverPage,imageUrl:"assets/imgs/settings.png"},
        {title: 'About Us' , component :  DriverPage,imageUrl:"assets/imgs/about.png"},
        {title: 'Log-Out', component: LoginPage, imageUrl: "assets/imgs/signout.png"},
      ];
    }
  }
  
//Function to open to the respective screens
  openPage(page){
    this.nav.setRoot(page.component);
    console.log("entered");
  }
}

