import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FactoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FactoryProvider {

  RIDER_NAME='';
  contact='';
  userProfile='';
  username='';
  constructor(public http: HttpClient) {
    console.log('Hello FactoryProvider Provider');
  }

//local storage of the values
  setrider_username(i) {
    this.RIDER_NAME = i;
  }

  getrider_username() {
    return this.RIDER_NAME;
  }

  set_contact(i){
    this.contact=i;
  }
  get_contact(){
    return this.contact;
  }

  set_userProfile(i){
    this.userProfile = i;
  }

set_username(i){
  this.username=i;
}

get_username(){
  return this.username;
}


  get_userProfile(){
    return this.userProfile;
  }
}
