import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events} from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { RiderPage } from '../rider/rider';
import { DriverPage } from '../driver/driver';
import { FactoryProvider } from '../../providers/factory/factory';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  users: any = {username: "", password: "", identitynum: "", contact: "",userProfile: "",profile_image:""};

  constructor(public event: Events,public settings:FactoryProvider,public alertCtrl: AlertController,public http:Http, public db :DatabaseProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    console.log(this.users);
    //evaluating the CURRENT username and Password
    var link= 'https://testlocater.000webhostapp.com/validate_login.php?username='+this.users.username+'&password='+this.users.password;
    this.http.get(link)
    .subscribe((creddata) => {
        console.log(creddata);
        var response = creddata["_body"];
        var res= response.split("|");
        console.log(res[0]);
        console.log(res[1]);
        //if profile="rider"---> take him to RiderPage
        if(res[0] == "rider"){
          this.settings.set_username(this.users.username);
          this.settings.set_contact(res[1]);
          this.settings.set_userProfile(res[0]);
          this.event.publish('nav:leave');
          this.navCtrl.setRoot(RiderPage);
        }
        //if profile="Driver"---> take him to DriverPage
        else if(res[0] == "driver")
        {
          this.settings.set_username(this.users.username);
          this.settings.set_userProfile(res[0]);
          this.settings.set_contact(res[1]);
          this.event.publish('nav:leave');
          this.db.createRide_List_Table();
          this.db.insertRide_List_Table().then((res:any)=>{
            console.log(res);
          });
          this.navCtrl.setRoot(DriverPage);
        }
        else {
            const alert = this.alertCtrl.create({
              title: 'Invalid Credentials,Kindly Re-check',
              buttons: ['OK']
            });
            alert.present();
          }       
  });
}

  signup(){
    this.navCtrl.setRoot(SignupPage);
  }
}
