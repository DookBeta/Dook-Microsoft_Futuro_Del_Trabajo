import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { FirestoreService } from '../firestore.service';
import { element } from 'protractor';
import { TabsPage } from '../tabs/tabs.page';
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';
import { ModalController, IonRouterOutlet, LoadingController } from '@ionic/angular';
import { OfferModalPage } from '../offer-modal/offer-modal.page';
import { Router, NavigationExtras } from '@angular/router';
import { OfferService } from '../shared/offer.service';
import { Storage } from '@capacitor/core';
import { CurrentUserService } from '../shared/current-user.service';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewInit, OnInit {

  notransform;
  transform;
  userName;
  segmentModel = "1Todos";

  cardNumber = new Array(12);

  @ViewChild('trigger', { read: ElementRef, static: false }) trigger: ElementRef;
  // @ViewChild('barChart', {static: false}) barChart;


  private observer: IntersectionObserver;

  bars: any;
  colorArray: any;

  offersCircle = [
    {
      type: 'Evento',
      amount: 1078,
      percentage: 0,
      radius: 50,
      strokeDasharray: 0,
      strokeDashoffset: 0,
      stroke: "#EEA8C1",
      rgb: "238, 168, 193"
    }, {
      type: 'Beca',
      amount: 213,
      percentage: 0,
      radius: 20,
      strokeDasharray: 0,
      strokeDashoffset: 0,
      stroke: "#5677D8",
      rgb: "86, 119, 216"
    }, {
      type: 'Pasantia',
      amount: 1124,
      percentage: 0,
      radius: 35,
      strokeDasharray: 0,
      strokeDashoffset: 0,
      stroke: "#06C0D7",
      rgb: "6, 192, 215"
    }]

  total;
  Offers = [];
  fav: boolean;
  currentUserFavorites = [];
  constructor(private firestore: FirestoreService, public tabPage: TabsPage, public modalCtrl: ModalController, private routerOutlet: IonRouterOutlet,
    public router: Router, public offerService: OfferService, private loading: LoadingController, public user: CurrentUserService) {
      
  }


  async segmentChanged(event) {
    this.offerService.filterOffer(event.detail.value.slice(1, -1)).then(()=>{
      console.log("done loading " + event.detail.value + "...");
      this.Offers = this.offerService.Offers;
    });
    var scrollElem = document.querySelector('#top');
    let selected: string = event.detail.value.slice(0, 1);

    if (selected == "1") {
      document.documentElement.style
        .setProperty('--checked', '56, 128, 255');
    } else {
      let index = +selected - 2;
      console.log(index)
      document.documentElement.style
        .setProperty('--checked', this.offersCircle[index].rgb);
    }
    if (this.transform == true) {
      scrollElem.scroll(0, 0);
    };
    this.ngAfterViewInit();

  }

  async ionViewWillEnter(){
    this.user.getUser().then((userData)=>{
      console.log(userData);
      this.userName = userData['displayName'];
    })
  }
  async ionViewDidEnter(){
    await this.offerService.filterOffer("Todo").then((offers:any)=>{
      console.log("donde loading all...")
      this.Offers = this.offerService.Offers;
    });
    await this.offerService.delay();
    this.loading.dismiss();
  }

  async ngOnInit() {
    
    this.firestore.get_offers().subscribe((res)=>{
      let total = [];
      res.map(e=>{
        total.push(e)
      })
      this.total = total.length;
    })

    document.documentElement.style
      .setProperty('--checked', '56, 128, 255');

    for (let i = 0; i < this.offersCircle.length; i++) {
      this.firestore.filter_offer_by(this.offersCircle[i].type).subscribe((res)=>{
        let amount = [];
        res.map(e=>{
          amount.push(e)
        })
        this.offersCircle[i].amount = amount.length;
        let percent = Math.round(100 * this.offersCircle[i].amount / this.total);
        this.offersCircle[i].strokeDasharray = this.offersCircle[i].radius * 2 * Math.PI;
        this.offersCircle[i].percentage = this.offersCircle[i].strokeDasharray * (1 - (percent / 100));
        this.offersCircle[i].strokeDashoffset = this.offersCircle[i].strokeDasharray * (1 - .5);
      })
    };


  }



  async presentModal(Offer) {
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



  ngAfterViewInit() {
    // this.createBarChart();

    this.observer = new IntersectionObserver((entries) => {

      entries.forEach((entry: any) => {

        if (entry.isIntersecting) {
          this.transform = false;
        }
        else {
          this.transform = true;
        }
      })

    });
    setTimeout(() => {
      this.observer.observe(this.trigger.nativeElement);
    }, 10);

  }



  // createBarChart() {
  //   this.bars = new Chart(this.barChart.nativeElement, {
  //     type: 'line',
  //     data: {
  //       labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
  //       datasets: [{
  //         data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
  //         backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
  //         borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
  //         borderWidth: 1,
  //         fill: false
  //       }]
  //     },
  //     options: {
  //       legend:{display:false},
  //       scales: {
  //         yAxes: [{
  //           display: false,
  //           ticks: {
  //             beginAtZero: true
  //           }
  //         }]
  //       }
  //     }
  //   });
  // }

}
