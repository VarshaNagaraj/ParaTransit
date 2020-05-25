import { HttpClient } from '@angular/common/http';
import {Platform} from 'ionic-angular';
import { Injectable,NgZone } from '@angular/core';
// import {Storage} from "@ionic/storage";
import {BackgroundGeolocation,BackgroundGeolocationResponse ,BackgroundGeolocationConfig} from '@ionic-native/background-geolocation';
import {Geolocation,Geoposition} from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/storage";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { FactoryProvider } from '../factory/factory';

/*
  Generated class for the LocationTrackerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationTrackerProvider {

  public watch: any;    
  public lat: number = 0;
  public lng: number = 0;
  constructor(public platform: Platform,
    public LocalStorage: Storage,
              private Location  : Geolocation,
              public backgroundGeolocation:BackgroundGeolocation,
              public zone: NgZone,
              public Http:Http,
              public settings:FactoryProvider,
              public http: HttpClient) {
    console.log('Hello LocationTrackerProvider Provider');
  }

//Background Geolocation tracking for current updates 

  startTracking(){
    try{
      this.platform.ready().then(() => {
        console.log("-------Started Location Tracking--------");
       const config:BackgroundGeolocationConfig = {
          desiredAccuracy: 0,
          stationaryRadius: 20,
          distanceFilter: 10, 
          stopOnTerminate: false,
          debug: false,
          interval: 2000 
        };
        this.backgroundGeolocation.configure(config).then((location:BackgroundGeolocationResponse) => {
          console.log( location);
          console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);    
          // Run update inside of Angular's zone
          this.zone.run(() => {
            this.lat = location.latitude;
            this.lng = location.longitude;
            console.log(this.lat);
            console.log(this.lng);
          });
        }, (err) => {
          console.log(err);    
        });
    
        // Turn ON the background-geolocation system.
        this.LocalStorage.set('locTracking', true);
        this.backgroundGeolocation.start().then((res) => {
          console.log(res);
          console.log("Background Tracking Started....");
      });
        // Foreground Tracking
    
      let options = {
        frequency: 3000, 
        enableHighAccuracy: true
      };
    
      this.watch = this.Location.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
    
        console.log(position);
        var name =this.settings.getrider_username();
        console.log(name);
 
        // Run update inside of Angular's zone
        this.zone.run(() => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          var link= 'https://testlocater.000webhostapp.com/user_loc.php?latitude='+this.lat+'&longitude='+this.lng+'&username='+name;
          this.Http.post(link,null)
          .subscribe((response) => {
          console.log(response);
          console.log(response["_body"]);
          });
        });
    
      });
      });
    }catch (e) {console.log(e)};


    
  }

  stopTracking () {
    console.log("-------Ended Location Tracking--------");
    try {
        this.platform.ready().then(() => {
            this.backgroundGeolocation.finish();
            this.LocalStorage.set('locTracking', false);
            this.watch.unsubscribe();
        });
    }catch(e) {console.log(e)};
}
}
