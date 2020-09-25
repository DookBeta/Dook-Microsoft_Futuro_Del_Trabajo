import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonRouterOutlet } from '@ionic/angular';




@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss'],
})
export class OfferCardComponent implements OnInit {



offer={
  tags:[{
    color: 'primary',
    style: 'outline',
    text: 'Matematicas'
  },
  {
    color: 'primary',
    style: 'outline',
    text: 'Matematicas'
  },
  {
    color: 'primary',
    style: 'outline',
    text: 'Matematicas'
  },
  {
    color: 'primary',
    style: 'outline',
    text: 'Matematicas'
  },
  {
    color: 'primary',
    style: 'outline',
    text: 'Matematicas'
  },
  ],
  title: "Offer Title",
  location: "Offer location",
  content: "Offer content",
  level: "Maestria",
  duration: "2 meses",
  date: "22 de julio",
  img: "image"
}

  constructor(public modalCtrl: ModalController, private routerOutlet: IonRouterOutlet) { }

  ngOnInit() {}


}
