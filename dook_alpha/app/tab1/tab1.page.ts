import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalController, PickerController, LoadingController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';
import { IonRouterOutlet } from '@ionic/angular';
import { PickerOptions } from '@ionic/core'

import { Offer } from "../shared/offer";
import { OfferService } from "../shared/offer.service"
import { OfferModalPage } from '../offer-modal/offer-modal.page';
import { Router, NavigationExtras } from '@angular/router';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  Offers:Array<any> = [];
  searchBarStatus = false;

  filteredOffers = [];

  // offer={
  //   tags:[{
  //     color: 'primary',
  //     style: 'outline',
  //     text: 'Matematicas'
  //   },
  //   {
  //     color: 'primary',
  //     style: 'outline',
  //     text: 'Matematicas'
  //   },
  //   {
  //     color: 'primary',
  //     style: 'outline',
  //     text: 'Matematicas'
  //   },
  //   {
  //     color: 'primary',
  //     style: 'outline',
  //     text: 'Matematicas'
  //   },
  //   {
  //     color: 'primary',
  //     style: 'outline',
  //     text: 'Matematicas'
  //   },
  //   ],
  //   title: "Offer Title",
  //   location: "Offer location",
  //   content: "Offer content",
  //   level: "Maestria",
  //   duration: "2 meses",
  //   date: "22 de julio",
  //   img: "image"
  // }

  cards: Array<any> = [];

  filterIcon = "options-outline";

  filters = [{
    text: "Nivel Mínimo",
    value: 'level',
    color: "medium",
    icon: "school-outline"
  },
  {
    text: "Duración",
    value: 'duration',
    color: "medium",
    icon: "time-outline"
  },
  {
    text: "Ubiación",
    value: 'location',
    color: "medium",
    icon: "location-outline"
  }]

  //Para featured
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    centeredSlides: true,
    centeredSlidesBounds: true,
    spaceBetween: 10,
    slidesPerView: 1.4,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      dynamicBullets: true,
      dynamicMainBullets: 3,
      clickable: true
    },
  };
  //Para el filter
  niveles = [{
    name: "Maestria",
    active: false
  }, {
    name: "Doctorado",
    active: false,
  }, {
    name: "Grado",
    active: false
  }]

  tipos = [{
    name: "Investigacion",
    active: false
  }, {
    name: "Practicas",
    active: false,
  }, {
    name: "Proyecto",
    active: false
  }]

  hide: boolean = false;
  show: boolean = true;

  fav: boolean = false;

  modOffers = [];

  clearFilter: boolean = false;

  filterActive: boolean = false;

  currentUserUID: string;
  constructor(public modalCtrl: ModalController, public tabPage: TabsPage, private routerOutlet: IonRouterOutlet
    , public offerService: OfferService, public pickerCtrl: PickerController, public router: Router, public loadCtrl: LoadingController) {
      
  }



  goToInterests(interest, type, Offers) {
    let color: string;
    switch (type) {
      case "feat":
        color = "warning"
        break;
      case "aofi":
        color = "secondary"
        break;
      case "sofi":
        color = "tertiary"
        break;
      case "cost":
        color = "success"
        break;
      default:
        color = "medium"
        break;
    }
    console.log(color);
    let navigationExtras: NavigationExtras = {
      state: {
        interest: interest,
        color: color,
        Offers: Offers
      }
    };
    this.router.navigate(['interests'], navigationExtras);
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

  async presentLoading() {
    const loading = await this.loadCtrl.create({
      message: 'Espere...',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }



  activateFilter() {
    this.filterActive = !this.filterActive;
    if (this.filterIcon == "options-outline") {
      this.filterIcon = "close-outline";
    } else {
      this.filterIcon = "options-outline"
    }

    console.log('activated filtering');
  }

  activeNivel(i) {
    this.niveles[i].active = !this.niveles[i].active;
  }

  activeTipo(i) {
    this.tipos[i].active = !this.tipos[i].active;
  }
  //Para esconder tabs
  logScrolling(ev) {
    if (ev.detail.velocityY > 1.2) {
      this.hide = true;
      this.show = false;
    } else if (ev.detail.velocityY < -1.2) {
      this.show = true;
      this.hide = false;
    };
    if (ev.detail.scrollTop > 150) {
      this.tabPage.scrollFunction({ hide: this.hide, show: this.show })

    }
  }





  async presentModal(Offer: Offer) {
    const modal = await this.modalCtrl.create({
      component: OfferModalPage,
      cssClass: 'offer-modal',
      swipeToClose: true,
      animated: true,
      showBackdrop: true,
     // presentingElement: this.routerOutlet.parentOutlet.nativeEl,
      mode: 'ios',
      componentProps: { 'data': Offer }
    });
    return await modal.present();
  }

  cardPressed(Offer) {
    this.presentModal(Offer);
  }

  ionViewWillEnter(){
    //this.presentLoading();
  }

  async ionViewDidEnter() {
    await this.offerService.filterOffer("Todo").then((res:Array<any>)=>{
      this.Offers = this.offerService.Offers
      this.filteredOffers = this.Offers;
      if(this.cards.length == 0){
        res.forEach(element => {
          if (element.featured) {
            this.cards.push(element);
          }
        });
         for (let i = 0; i < this.cards.length; i++) {
            this.cards[i]['bck'] = "background-image:url(" + this.cards[i].img + ")";
          }
      }
    })
  }

  async ngOnInit() {
  
  }




  //Usando firebase realtime db
  // fetchOffers() {
  //   this.offerService.getOfferList().valueChanges().subscribe(res => {
  //     this.Offers = res;
  //     let offersRes = this.offerService.getOfferList();
  //     offersRes.snapshotChanges().subscribe(res => {
  //       for (let index = 0; index < res.length; index++) {
  //         let a = res[index].payload.toJSON();
  //         this.Offers[index]['$key'] = res[index].key;
  //         if (!('img' in this.Offers[index])) {
  //           this.Offers[index]['img'] = "../../assets/images/image_placeholder.svg";
  //         }
  //         if (!('logo' in this.Offers[index])) {
  //           this.Offers[index]['logo'] = "../../assets/images/Dook-BoW.png";
  //         }
  //       }
  //       this.modOffers = this.Offers;


  //       if (this.cards.length == 0) {
  //         this.Offers.forEach(offer => {
  //           if (offer.featured) {
  //             this.cards.push(offer);
  //           }
  //         });
  //         for (let i = 0; i < this.cards.length; i++) {
  //           this.cards[i]['bck'] = "background-image:url(" + this.cards[i].img + ")";
  //         }
  //       }
  //     })
  //   })
  // }


  search(ev: any) {
    console.log(ev.target.value);
    this.filteredOffers = this.filterByValue(this.filteredOffers, ev.target.value.toLowerCase());
  }

  filterByValue(array, string) {
    return array.filter(o => {
      return Object.keys(o).some(k => {
        if (typeof o[k] === 'string') {
          return this.slugify(o[k]).includes(string.toLowerCase())
        };
      });
    });
  }

  createOffer() {
    this.offerService.createOffer();
    console.log("click");
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

  searchBarFocused() {
    this.searchBarStatus = true;
  }

  searchBarCancel() {
    this.searchBarStatus = false;
  }

  filterOpts(filter, index) {
    let level = [{ text: 'Universidad', value: "Universidad" }, { text: 'Maestria', value: "Maestria" }, { text: 'Doctorado', value: "Doctorado" }];
    let duration1 = [];
    //Llenar datos para un mes
    for (let index = 1; index < 31; index++) {
      duration1.push({ text: index.toString(), value: index });
    }
    let duration2 = [{ text: 'Dias', value: "dias" }, { text: 'Semanas', value: 'semanas' }, { text: 'Meses', value: "meses" }];
    if (filter.value == "level") {
      let col = [{
        name: filter.text,
        value: filter.value,
        options: level,
      }]
      this.showPicker(col, index);
    } else {
      let col = [{
        name: filter.text,
        value: filter.value,
        options: duration1,
      }, {
        name: name + '1',
        options: duration2
      }]
      this.showPicker(col, index);
    }
  }

  locationFilter() {

  }

  costFilter() {

  }


  filterByFilter(array, filterValue:string, filter:string){
    return array.filter(o=>{
      return Object.keys(o).some(k => {
        return this.slugify(o[filter]).includes(filterValue.toLowerCase());
      });
    })
  }


  clearFilters() {
    this.filteredOffers = this.Offers;
    this.clearFilter = false;
    this.filters.forEach(filter => {
      filter.color = "medium";
    });
  }
  async showPicker(cols, index) {

    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (value: any) => {
            this.clearFilter = true;
            this.filters[index].color = "primary";
            if(cols[0].value == "duration"){
              let name : string = (cols[0].selectedIndex + 1) + " " + value['1']['value'];
              console.log(name)
              this.filteredOffers = this.filterByFilter(this.Offers,name,cols[0].value)
            } else {
              let name = value[cols[0].name].text;
            console.log(name)
            this.filteredOffers = this.filterByFilter(this.Offers, name, cols[0].value)
            }
          }
        }
      ],
      columns: cols
    };

    let picker = await this.pickerCtrl.create(options);
    picker.present()
  }
}




