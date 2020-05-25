import { Component } from '@angular/core';
import { NavController,MenuController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public location :Geolocation, public menuCtrl: MenuController,private platform: Platform) {
    this.menuCtrl.enable(false, 'menuId');
    this.platform.ready().then(() =>{
      var options={
        timeout : 5000
      };
      //Fetch the current location
        this.location.getCurrentPosition(options).then((response)=>{
          // console.log(response.coords.latitude);
          // console.log(response.coords.longitude);
        }).catch ((error)=>{
          console.log("there is an error",error);
    
        });
    });
  }
  openMenu() {
    this.menuCtrl.open();
  }

}
