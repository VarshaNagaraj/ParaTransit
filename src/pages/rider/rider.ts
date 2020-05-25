import { Component,ViewChild,ElementRef ,NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController,AlertController,Platform} from 'ionic-angular';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import {Geolocation} from "@ionic-native/geolocation";
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { DatabaseProvider } from '../../providers/database/database';
import { FactoryProvider } from '../../providers/factory/factory';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/storage";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
/**
 * Generated class for the RiderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare let google;
@IonicPage()
@Component({
  selector: 'page-rider',
  templateUrl: 'rider.html',
})
export class RiderPage {
  public result : any = {};
  Locations: any;
  map: any;
  ride:any=[{}];
  result_Value :any={};
  public lat: number = 0;
  public lng: number = 0;
  driver_lat :any;
  driver_long :any;
  rider_lat:any;
  rider_long:any;
  @ViewChild('map') mapElement: ElementRef;
  constructor( public LocalStorage: Storage,public zone: NgZone,public toastCtrl: ToastController,public http:Http, public settings:FactoryProvider,public db :DatabaseProvider,private Accuracy: LocationAccuracy, private alertCtrl:AlertController,public platform: Platform,private backgroundGeolocation: BackgroundGeolocation,public Location :Geolocation ,public locationTracker: LocationTrackerProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.db.initilizeDB();
    this.db.dropRide_List_Table(); 
    this.db.createRide_List_Table();
    this.db.insertRide_List_Table().then((res:any)=>{
    console.log(res);
   });
  }


  ionViewDidEnter() 
  {
    this.ridelist();
    console.log('ionViewDidLoad RiderPage');
  }

ridelist(){
  this.db.getAllRide_List_Table().then((ride_list)=>{
    console.log(ride_list);
    this.ride=ride_list;
    console.log(this.ride);
    var contactNum = this.settings.get_contact();
    console.log(contactNum);
    for(let i=0;i<this.ride.length;i++){
      if(contactNum == this.ride[i].RIDER_CONTACT){
        var rideList= this.ride[i];
        this.result_Value=rideList;
        console.log(rideList);
       console.log(this.result_Value.RIDER_LATITUDE); 
     
      }
    }

    ///////////code to fetch latitude and longitude of the driver from server/////////////

   this.LocalStorage.get('locTracking').then((val)=>{
      console.log(val);
    });
      var link= 'https://testlocater.000webhostapp.com/user_loc_update.php?username='+this.result_Value.RIDER_NAME;
      this.http.get(link)
      .subscribe((creddata) => {
          console.log(creddata);
        var response = creddata["_body"];
          console.log(response);
          var res= response.split("|");
          this.driver_lat=res[0];
          this.driver_long = Math.abs(res[1]);
          console.log(res[0]);
        console.log(res[1]);
      },(error) => {
          console.log(error);
          let toast = this.toastCtrl.create({
              message: 'Not Allowed!',
              cssClass: "toastClass",
              duration: 4000
          });
          toast.present();
      });
  });
 
}

getLocation()
 {
    return new Promise((resolve) => 
    {
      this.platform.ready().then(() => 
      {
        this.Location.getCurrentPosition({enableHighAccuracy: true, timeout: 10000})
        .then((location) => 
        {
          //alert(location.coords.latitude + " - " + location.coords.latitude + "\n" + JSON.stringify(location));
          this.rider_lat = location.coords.latitude;
          this.rider_long = Math.abs(location.coords.longitude);
          console.log(this.rider_lat);
          console.log(this.rider_long);
          resolve(this.result);
      })
      .catch((error) => 
      {              
                                  //******************if user clicks cancel for apps location   ************
                                  //alert("getCurrentPosition Error \n" + JSON.stringify(error));
        let prompt = this.alertCtrl.create({
          title: 'GPS Error. Phone was unable to fetch Geolocation Data',
                            message: ' Please Turn ON the GPS.',
                            buttons: [
                                        {
                                            text: 'Cancel',
                                            handler: data =>
                                            {
                                                console.log('Cancel clicked');
                                                resolve('cancel');
                                            }
                                        },
                                        {
                                          text: 'OK',
                                          handler: data =>
                                          {
                                            console.log('OK clicked');
                                            resolve(this.result);
                                          }
                                        }
                                      ]
            });
            prompt.present();                  
        });
      });
    });
  }
 
  //Marker on the Google Maps
  addMarker() {
      let markers = [];
      for (let i = 0; i < this.Locations.length; i++) {
          markers[i] = new google.maps.Marker({
              position: this.Locations[i],
              map: this.map,
              title: 'Click to zoom',
              icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
          });
      }
  }
}
