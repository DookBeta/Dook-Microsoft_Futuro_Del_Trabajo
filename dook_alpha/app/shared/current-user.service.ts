import { Injectable } from '@angular/core';
import { Storage } from "@capacitor/core"

@Injectable({
  providedIn: 'root'
})


export class CurrentUserService {
  userData = null;
  constructor() {
    this.userData = this.getUser();
   }


   async setObject(userData) {
    await Storage.set({
      key: 'user',
      value: JSON.stringify(userData)
    });
    console.log('User saved!')
    this.userData = userData;
  }

  async removeUser(){
    await Storage.remove({key:'user'})
    this.userData = null;
  }
  
  // JSON "get" example
  async getUser() {
    const ret = await Storage.get({ key: 'user' });
    const user = JSON.parse(ret.value);
    return user;
  }
  
}
