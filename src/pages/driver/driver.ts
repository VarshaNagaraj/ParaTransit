import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {ModalPage} from '../modal/modal';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DatabaseProvider } from '../../providers/database/database';
//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';

/**
 * Generated class for the DriverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-driver',
  templateUrl: 'driver.html',
})
export class DriverPage {
  ride:any=[];
  constructor(public locationTracker: LocationTrackerProvider,public socialSharing:SocialSharing,public db:DatabaseProvider,public navCtrl: NavController,public modalCtrl: ModalController,public navParams: NavParams) {
  }


  // Dont forget to change its place to app.ts
  ionViewDidLoad() {
    //Offline Database Management
    this.db.initilizeDB();
    this.db.dropRide_List_Table(); 
    this.db.createRide_List_Table();
    this.db.insertRide_List_Table().then((res:any)=>{
      console.log(res);
    });
    this.db.getAllRide_List_Table().then((ride_list)=>{
      console.log(ride_list);
      this.ride=ride_list;
    });
    console.log('ionViewDidLoad DriverPage');
  }

  //Open ModalPage to check for more information about Rider.
  openmodal(id){
    console.log(id);
        let modal = this.modalCtrl.create(ModalPage,{id:id});
        modal.present();
  }




}
