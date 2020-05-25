import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController,NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { FactoryProvider } from '../../providers/factory/factory';
import {Http, Headers, Response} from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  //declarations
  rideID:any;
  rideList:any=[{}];

  constructor(public http:Http,
    public settings:FactoryProvider,
    public locationTracker: LocationTrackerProvider,
    private sms: SMS,public socialSharing:SocialSharing,
    public db :DatabaseProvider,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams) 
    {
      this.rideID= this.navParams.get('id');
      console.log(this.rideID);
      this.rider_details();
    }

//Text input-readonly
    isReadonly() {
       return true;
    }
  
  //Fetch rider details from database
  rider_details(){
    // console.log("Entered");
    this.db.getRide_List(this.rideID).then((res)=>{
      this.rideList= res;
      console.log(this.rideList);
      this.settings.setrider_username(this.rideList[0].RIDER_NAME);
    });
  }

  //Closing of the modal
  dismiss(){
    this.viewCtrl.dismiss();
  }


  // sharelocation(num, text){
  //   console.log(num);
  //   console.log(text);
  //   this.sms.send('num', 'text');
  // }

  // shareLocation(){
  //   // var num = "+1" + this.rideList[0].RIDER_CONTACT;
  //   // console.log(num);
  //   // // var msg = "Hi,Now you can track your booked ride";
  //   // var options={
  //   //   replaceLineBreaks: false, // true to replace \n by a new line, false by default
  //   //   android: {
  //   //        intent: 'INTENT'  // Opens Default sms app
  //   //       //intent: '' // Sends sms without opening default sms app
  //   //     }
  //   //   }
  //   //   this.sms.send("3169251118","hi varsha",options).then((res)=>{
  //   //     console.log(res);
  //   //   },(error)=>{
  //   //     console.log(error);
  //   //     alert("failed");
  //   //     });
  // } 


  //Location is shared to the respective rider 
  sharelocation(){
    var link= 'https://testlocater.000webhostapp.com/mail.php?email='+this.rideList[0].RIDER_EMAIL;
    this.http.get(link)
    .subscribe((creddata) => {
        console.log(creddata);
      var response = creddata["_body"];
        console.log(response);
    },(error) => {
        console.log(error);
    });
    this.locationTracker.startTracking();
  }

  stop(){
    this.locationTracker.stopTracking();
  }
}
