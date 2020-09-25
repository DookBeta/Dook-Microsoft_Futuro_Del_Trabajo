import { Component, OnInit } from '@angular/core';

import {AutoCompleteOptions} from 'ionic4-auto-complete';
import { UniversitiesService } from '../services/universities.service';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { FirestoreService } from '../firestore.service';
import { element } from 'protractor';
import { Storage } from '@capacitor/core';


@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.page.html',
  styleUrls: ['./add-education.page.scss'],
})
export class AddEducationPage implements OnInit {
  public options:AutoCompleteOptions;

  public selected:string = '';

  placeholder = "Hola";
  currentYear = new Date().getFullYear();
  element = {
    timeStart: "",
    career: "",
    timeEnd: "",
    name: "",
    logo: ""

  };
  updating: boolean = false;
  constructor(
    public provider:UniversitiesService,  private modalController: ModalController,public navParams: NavParams,
    private firestore: FirestoreService, public alertController: AlertController
  ) {
    this.updating = false;
    this.options = new AutoCompleteOptions();
    if(this.navParams.get('data').length != 0){
      console.log(this.navParams.get('data'));
      this.element = this.navParams.get('data');
      this.updating = true;
    } else {
      this.updating = false;
    }
    this.options.autocomplete = 'on';
    this.options.debounce = 750;

    
    
  }


  current: boolean = false;


  ngOnInit() {
    
  }

  
async getUser(){
  const x = await Storage.get({key:'user'});
  return JSON.parse(x.value);
}

  startDate(ev){
    this.element.timeStart = ev.detail.value;
  }

  endDate(ev){
    this.element.timeEnd = ev.detail.value;
  }

  async update(){ 
    const user = await this.getUser()
    this.firestore.update_userDetails( user['uid'],'histAcademica',this.element);
    this.modalController.dismiss();
  }

  async delete(){
    const user = await this.getUser()
    console.log(this.element);
    this.modalController.dismiss();
    this.firestore.update_userDetails( user['uid'],'histAcademica',this.element); //Si es igual this.element entonces lo borra
  }

  cancel(){
    this.modalController.dismiss();
  }

  async addClicked(){
    const user = await this.getUser()
    if(this.element.career == "" || this.element.name == "" || this.element.timeStart == ""){
      console.log(this.element);
      this.presentAlert();
    } else {
      this.firestore.add_userDetails( user['uid'],'histAcademica',this.element); 
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

  carrerSelected(ev){
    this.element.career = ev.detail.value;
  }
  

  on(output, event):void {
    console.log(output);
    // console.log(event);
    if(output == "itemSelected"){
      console.log(event);
      this.element.name = event.name;
      let url = event.web_pages[0].slice(11,-1);
      this.element.logo =  ("//logo.clearbit.com/"+url+"?size=80").toString();;
    }
  }


  checked(){
    this.current = !this.current;
    console.log(this.current);
  }


}
