import { Component, OnInit } from '@angular/core';
import {AutoCompleteOptions, BoldPrefix} from 'ionic4-auto-complete';
import { CountryService } from '../services/country.service';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { FirestoreService } from '../firestore.service';
import { Storage } from '@capacitor/core';


@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.page.html',
  styleUrls: ['./add-language.page.scss'],
})
export class AddLanguagePage implements OnInit {
  public options:AutoCompleteOptions;

  public selected:string = '';
  updating: boolean = false;
  element: string = "";
  constructor(public provider:CountryService, private modalController: ModalController,private firestore: FirestoreService,
    public navParams: NavParams, public alertController:AlertController) { this.options = new AutoCompleteOptions();

    this.options.autocomplete = 'on';
    this.options.debounce = 750;
    if(this.navParams.get('data').length != 0){
      this.updating = true;
      this.element = this.navParams.get('data');
      console.log(this.element);
    }
  }

  ngOnInit() {
  }

  on(output, event):void {
    if(output == 'itemsChange'){
      this.element = event;
    }
    // console.log(event);
  }

  async getUser(){
    const x = await Storage.get({key:'user'});
    return JSON.parse(x.value);
  }

  cancel(){
    this.modalController.dismiss();
  }

  async addClicked(){
    const user = await this.getUser()
    if(this.element == ""){
      console.log(this.element);
      this.presentAlert();
    } else {
      this.firestore.add_userDetails( user['uid'],'idiomas',this.element); 
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
