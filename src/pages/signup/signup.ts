import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {LoginPage} from '../login/login';
import { RiderPage } from '../rider/rider';
import { DriverPage } from '../driver/driver';
import { FactoryProvider } from '../../providers/factory/factory';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

    // declarations
    users: any = {id:"",instance:"",username: "", password: "", identitynum: "", contact: "",userProfile: "",email:""};
    header: any;

  constructor( public event: Events,public settings: FactoryProvider,public http:Http, public db :DatabaseProvider,public navCtrl: NavController, public navParams: NavParams) {


  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter")
  }

  login(){
    console.log("login clicked");
    this.navCtrl.setRoot(LoginPage);
  }

  signUp(){
    console.log(this.users);
    console.log(this.users.userProfile[0]);
    var link = 'https://testlocater.000webhostapp.com/register.php?username='+this.users.username+'&password='+this.users.password+'&identitynum='+this.users.identitynum+'&contact='+this.users.contact+'&userprofile='+this.users.userProfile[0]+'&email='+this.users.email;
    // var data = JSON.stringify({username: this.users.username, password : this.users.password , identitynum :this.users.identitynum,contact :this.users.contact });
    this.http.post(link,null)
    .subscribe((response) => {
        console.log(response);
        // creddata["_body"];
        if (response["_body"]=="success"){
          this.db.initilizeDB();
          this.db.createUserTable();
          this.db.insertUserTable(this.users.username, this.users.password, this.users.identitynum, this.users.contact, this.users.userProfile[0],this.users.email);
        
          //If profile="Rider"-->RiderPage Access
          if(this.users.userProfile[0]=="rider"){
            this.settings.set_userProfile("rider");
            this.settings.set_username(this.users.username);
            this.event.publish('nav:leave');
            this.settings.set_contact(this.users.contact);
            this.navCtrl.setRoot(RiderPage);
          }
          //If profile="Driver"-->DriverPage Access
          else if(this.users.userProfile[0]=="driver") {
            this.settings.set_userProfile("driver");
            this.settings.set_username(this.users.username);
            this.event.publish('nav:leave');
            this.settings.set_contact(this.users.contact);
            this.navCtrl.setRoot(DriverPage);
          }
        }else{
          console.log("Error");
        }
    }, error => {
        console.log(error);
    });
  }
}
