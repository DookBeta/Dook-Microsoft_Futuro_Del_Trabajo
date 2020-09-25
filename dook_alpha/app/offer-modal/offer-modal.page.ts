import { Component, OnInit } from '@angular/core';
import { NavParams, ToastController } from '@ionic/angular';
import { Offer } from '../shared/offer';
import { FirestoreService } from '../firestore.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import firebase from 'firebase';
import { Vibration } from '@ionic-native/vibration/ngx';
import { OfferService } from '../shared/offer.service';
import {HttpClient} from '@angular/common/http';
import FastAverageColor from 'fast-average-color';

@Component({
  selector: 'app-offer-modal',
  templateUrl: './offer-modal.page.html',
  styleUrls: ['./offer-modal.page.scss'],
})


export class OfferModalPage  {


  Offer = {
    $key: null,
    title: "null",
    location: "null",
    content: "null",
    level: "null",
    duration: "null",
    date: "null",
    img: "null",
    institution: "null",
    logo: "null",
    payment: false,
    supervisorName: "null",
    maxCapacity: 0,
    currentCapacity: 0,
    timeDemand: [0, "a", "a"],
    amount: 0,
    url: "../../assets/images/image_placeholder.svg",
    featured: false,
    aofi: [],
    sofi: [],
    icon: {
      name: "",
      color: "",
      state: false
    }
  };

  MOOC:Object;

  vacancy: number;
  constructor(public navParams: NavParams, public toastCtrl: ToastController, private firestore: FirestoreService, private vibration: Vibration, public offerService: OfferService,
    private iab : InAppBrowser, private http: HttpClient) {
      

    this.Offer = this.navParams.get('data');
  }




  ionViewWillEnter() {
    
    this.vacancy = this.Offer.maxCapacity - this.Offer.currentCapacity;
    var bodyStyles = document.body.style;
    let filled = 100 * this.Offer.currentCapacity / this.Offer.maxCapacity;
    let empty = 100 - filled;
    bodyStyles.setProperty('--vacant-empty', empty + '%');
    bodyStyles.setProperty('--vacant-filled', filled + '%');
    bodyStyles.setProperty('--img', "url(" + this.Offer.img + ")");
    this.http.get('http://url-metadata.herokuapp.com/api/metadata?url='+this.Offer['urlmooc'])
    .subscribe((res)=>{
      this.MOOC = res['data'];
    })

   }

   


  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: this.Offer.title + ' se ha añadido a favoritos.',
      duration: 2000,
      position: 'bottom',
      mode: 'ios'
    });
    toast.present();
  }

  async sentRequest(url) {
    
this.iab.create(url,'_self',{
  closebuttoncaption: "Cerrar",
  hideurlbar: 'yes',
  toolbartranslucent: "yes"
});

    // const toast = await this.toastCtrl.create({
    //   message: 'Se ha enviado la solucitud.',
    //   duration: 1000,
    //   position: 'bottom',
    //   mode: 'ios'
    // });
    // toast.present();
  }


  favorited(offer) {
    if (this.Offer.icon.state == false) {
      this.firestore.add_favorite('gFzycrUxrGTgrD8rza4j', offer['id']);
      this.Offer.icon = {
        name: "heart",
        color: "danger",
        state: true
      }
    } else {
      this.firestore.remove_favorite('gFzycrUxrGTgrD8rza4j',offer['id']);
      this.Offer.icon = {
        name: "heart-outline",
        color: "light",
        state: false
      }
    }
  }


}
