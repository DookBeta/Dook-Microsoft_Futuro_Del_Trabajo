import { Component, OnInit } from '@angular/core';
import {AutoCompleteOptions, BoldPrefix} from 'ionic4-auto-complete';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { FirestoreService } from '../firestore.service';
import { Storage } from '@capacitor/core';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.page.html',
  styleUrls: ['./add-experience.page.scss'],
})
export class AddExperiencePage  {
  public options:AutoCompleteOptions;

  public selected:string = '';
  updating: boolean = false;
  element = {
    name: "",
    decription: ""
  };
  original_element = [];
  constructor(/*public provider:SkillsService,*/ private modalController: ModalController,private firestore: FirestoreService,
    public navParams: NavParams, public alertController:AlertController) { 
   
     }

     ionViewWillEnter(){
      if(this.navParams.get('data') != null){
        this.updating = true;
        this.element = this.navParams.get('data');
        this.original_element.push( this.navParams.get('data'));
        console.log('data: ',this.element);
      } else {
        this.updating = false;
      }
     }

 
  on(output, event):void {
    this.element[output] = event.detail.value;
    console.log(this.element);
    console.log(this.original_element)
  }

  async update(){ 
    const user = await this.getUser()
    console.log(this.original_element)
    await this.firestore.update_userDetails( user['uid'],'experiencias',this.original_element[0]); //Si es igual this.element entonces lo borra
    this.firestore.add_userDetails( user['uid'],'experiencias',this.element);
    this.modalController.dismiss();
  }

  async delete(){
    const user = await this.getUser()
    this.modalController.dismiss();
    this.firestore.update_userDetails( user['uid'],'experiencias',this.element); //Si es igual this.element entonces lo borra
  }


  cancel(){
    this.modalController.dismiss();
  }

  
async getUser(){
  const x = await Storage.get({key:'user'});
  return JSON.parse(x.value);
}

  async addClicked(){
    const user = await this.getUser();
    console.log(this.element.name ? true:false,this.element.decription ? true:false);
    if(this.element.decription?true:false && this.element.name?true:false){
      this.firestore.add_userDetails( user['uid'],'experiencias',this.element); 
    } else {
      console.log(this.element);
      this.presentAlert();
    }
    this.modalController.dismiss();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Campos Vacios',
      message: 'Por favor completa toda la informacion.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
