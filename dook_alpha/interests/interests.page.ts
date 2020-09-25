import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Location } from '@angular/common';
import { AlertController, ModalController } from '@ionic/angular';
import { OfferService } from '../shared/offer.service';

import { IonicSelectableComponent } from 'ionic-selectable';
import { OfferModalPage } from '../offer-modal/offer-modal.page';

import { IonRouterOutlet } from '@ionic/angular';


class Port {
  public id: number;
  public name: string;
}




@Component({
  selector: 'app-interests',
  templateUrl: './interests.page.html',
  styleUrls: ['./interests.page.scss'],
})

export class InterestsPage implements OnInit {

  ports: Port[];
  port: Port;

  interests = [];
  Offers = [];
  interestsList = [];
  interestsLoaded = [];
  adding = false;
  filteredInterests = [];

  @ViewChild('portComponent', { static: false }) portComponent: IonicSelectableComponent;

  constructor(private route: ActivatedRoute, private router: Router, public loc: Location, public alertCtrl: AlertController,
    public offerService: OfferService, private routerOutlet: IonRouterOutlet, public modalCtrl: ModalController) {
    
  }


  updateFilteredList() {
    this.filteredInterests = [];
    console.log(this.interestsLoaded.length);
    for(let i = 0; i<this.interestsLoaded.length; i++){

      let value: string = this.interestsLoaded[i]['interest'];
      console.log(value);
      let array = this.interests[0]['Offers'];
      console.log(array)
      array.forEach(element => {
        if (value.toLowerCase() == element['aofi'].toLowerCase()) {
          this.filteredInterests.push(element);
        }
        element['sofi'].forEach(sofi => {
          if (value.toLowerCase() == sofi.toLowerCase()) {
            this.filteredInterests.push(element);
          }
        });
      });
    }
  }



  async presentModal(Offer) {
    const modal = await this.modalCtrl.create({
      component: OfferModalPage,
      cssClass: 'offer-modal',
      swipeToClose: true,
      animated: true,
      showBackdrop: true,
      mode: 'ios',
      componentProps: { 'data': Offer }
    });
    return await modal.present();
  }
  cardPressed(Offer) {
    this.presentModal(Offer);
  }

  slugify(str) {
    var map = {
      'a': 'á|à|ã|â|À|Á|Ã|Â',
      'e': 'é|è|ê|É|È|Ê',
      'i': 'í|ì|î|Í|Ì|Î',
      'o': 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
      'u': 'ú|ù|û|ü|Ú|Ù|Û|Ü',
      'c': 'ç|Ç',
      'n': 'ñ|Ñ'
    };

    str = str.toLowerCase();

    for (var pattern in map) {
      str = str.replace(new RegExp(map[pattern], 'g'), pattern);
    };

    return str;
  };


  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.adding = !this.adding;
    this.interestsLoaded = [];
    console.log('port:', event.value);
    let array = Object.values(event.value);
    this.interestsLoaded.push({
      interest: this.interests[0]['interest'],
      color: 'tertiary'
    })
    array.forEach(element => {
      this.interestsLoaded.push(
        {
          interest: element['interest'],
          color: "tertiary"
        });
    });

    console.log(this.interestsLoaded);
    this.updateFilteredList();
  }




  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.interests.push(this.router.getCurrentNavigation().extras.state);
        this.interestsLoaded.push(this.interests[0]);
      }
    });
    this.updateFilteredList();

  }
  //Cuenta cuantos duplicados hay y genera array interestsList
  countDuplicates(original) {
    var count = {};
    original.forEach(function (i) { count[i] = (count[i] || 0) + 1; });
    console.log(Object.values(count));
    console.log(Object.keys(count));
    let array = Object.values(count);
    this.interestsList = [];
    for (let i = 0; i < array.length; i++) {
      if (Object.keys(count)[i] != "undefined") {
        this.interestsList.push({
          id: i,
          interest: Object.keys(count)[i],
          value: Object.values(count)[i],
          interestCombo: Object.keys(count)[i] + "     (" + Object.values(count)[i] + ")"
        })
      }
    }


    console.log(this.interestsList);

  }



  addInterest() {
    this.adding = !this.adding;
    this.interestsList = [];
      //Definir Offers
      this.Offers = this.interests[0]['Offers'];
      //Iterar todas para sacar los intereses
      this.Offers.forEach(offer => {
        this.interestsList.push(offer['aofi']);

        if (offer['featured']) {
          this.interestsList.push(offer['feautred']);
        }
        offer['sofi'].forEach(sofi => {
          this.interestsList.push(sofi);
        });
      });
      this.countDuplicates(this.interestsList);
      let index = this.interestsList.map(function(e) { return e.interest; }).indexOf(this.interests[0]['interest']);
      this.interestsList.splice(index,1);
      // this.presentAlertPrompt();
    this.portComponent.open();
  }

}
