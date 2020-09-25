import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { AuthenticationService } from '../shared/AuthenticationService';
import { ToastController } from '@ionic/angular';
import { Storage } from '@capacitor/core';


@Component({
  selector: 'app-preferncias-modal',
  templateUrl: './preferncias-modal.page.html',
  styleUrls: ['./preferncias-modal.page.scss'],
})
export class PrefernciasModalPage implements OnInit {

  userData = [];
  record_name;
  data;
  userImg;
  constructor(private firestore:FirestoreService, private toastCtrl: ToastController) { }

  ngOnInit() {
      }

  async ionViewWillEnter(){
    console.log("DId Load")
    this.userData = [];
    const user = await this.getUser()
    let id = user['uid']
    console.log(id)
    this.firestore.read_userDetails(id).subscribe((res=>{
      console.log(res.data());
      this.userData.push({data:res.data()['displayName'],label:"Nombre",type:"text"});
      this.userData.push({data:res.data()['email'],label:"Correo",type:"email"});
      this.userData.push({data:res.data()['edad'],label:"Edad",type:"number"});
      //this.userData.edad = res.data()['profile_picture'];
      
    }));
    this.userImg = user['photoURL'];

  }

  onClick(event){
    let systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    systemDark.addListener(this.colorTest);
    if(event.detail.checked){
      document.body.setAttribute('data-theme', 'dark');
    }
    else{
      document.body.setAttribute('data-theme', 'light');
    }
  }

   colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('data-theme', 'dark');		
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Se han guardado los cambios.',
      duration: 2000,
      position: 'bottom',
      mode: 'ios'
    });
    toast.present();
  }

  
async getUser(){
  const x = await Storage.get({key:'user'});
  return JSON.parse(x.value);
}

  async triggerChange(){
    this.presentToast();
    const user = await this.getUser()
    this.firestore.update_userData( user['uid'],{[this.record_name]:this.data});
  }

  updateValues(value,detail){
    switch (detail.label.toLowerCase()) {
      case "nombre":
        this.record_name = "displayName";
        break;
      case "correo":
        this.record_name = "email";
        case "edad":
          this.record_name = "edad";
      default:
        break;
    }
    this.data = value.detail.value;
  }

}
