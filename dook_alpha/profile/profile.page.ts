import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Chart } from 'chart.js';
import { ActionSheetController, AlertController, IonRouterOutlet, LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AddEducationPage } from '../add-education/add-education.page';
import { AddLanguagePage } from '../add-language/add-language.page';
import FastAverageColor from 'fast-average-color';
import { FirestoreService } from '../firestore.service';
import { flatMap, map } from 'rxjs/operators';
import { PrefernciasModalPage } from '../preferncias-modal/preferncias-modal.page';
import { AddInterestsPage } from '../add-interests/add-interests.page';
import { AddSkillPage } from '../add-skill/add-skill.page';
import { AddExperiencePage } from '../add-experience/add-experience.page';
import { AuthenticationService } from '../shared/AuthenticationService';
import { Storage } from '@capacitor/core';
import { OfferService } from '../shared/offer.service';
import { OfferModalPage } from '../offer-modal/offer-modal.page';
import { Router, NavigationExtras } from '@angular/router';
import { CurrentUserService } from '../shared/current-user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})


export class ProfilePage implements AfterViewInit {

  

    @ViewChild('userSkills', {static: false}) userSkills;
    @ViewChild('trigger', { read: ElementRef, static: false }) trigger: ElementRef;

    private observer: IntersectionObserver;

  
  constructor(public actionSheetController: ActionSheetController, public location: Location, public modalController: ModalController,
    private firestore: FirestoreService, public offer:OfferService, public alertController: AlertController, private routerOutlet: IonRouterOutlet, private auth: AuthenticationService,
    public modalCtrl: ModalController, private router: Router, public loadingCtrl: LoadingController, public user: CurrentUserService) {


    // const fac = new FastAverageColor();
    // fac.getColorAsync(this.academia[0].logo)
    //     .then(function(color) {
    //         console.log('Average color', color);
    //     })
    //     .catch(function(e) {
    //         console.log(e);
    //     });
   }

  transform:boolean;
  flip: boolean = false;

   userData={
     histAcademica: [],
      idiomas: [],
      intereses: [],
      habilidades: [],
      experiencias: []
   };
  options=[{
    title:"Datos Personales",
    img: "../../assets/images/personal_details.svg",
    color: "23,105,225",
    percentage: 10
  },{
    title: "Sectores de Interes",
    img: "../../assets/images/SofI.svg",
    color: "247,69,176",
    percentage: 20
  },{
    title: "Estudios",
  img: "../../assets/images/studies.svg",
  color: "0,255,179",
  percentage: 40
},
  {
    title:"Disponibilidad",
    img: "../../assets/images/Dook_part.svg",
    color: "255,170,85",
    percentage: 100
  },{
    title: "Practicas",
    img: "../../assets/images/internships.svg",
    color: "64,223,255",
    percentage: 50
  },{
    title: "Idiomas",
    img: "../../assets/images/languajes.svg",
    color: "255,85,85",
    percentage: 25
  }];
  colorArray: any;
  chart;

  selected = 'myinfo';
  lineColor;
  favorites;
  

  
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Espere...',
      cssClass: 'custom-loading'
    });
    await loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


async ionViewDidEnter(){
  const user = await this.getUser()
  this.firestore.get_userDetails(user['uid'])
   .subscribe((res)=>{
    this.userData.histAcademica = res['histAcademica'] || [];
      this.userData.idiomas = res['idiomas'] || [];
      this.userData.habilidades = res['habilidades'] || [];
      this.userData.intereses = res['intereses'] || [];
      this.userData.experiencias = res['experiencias'] || [];
   })
   this.getFavorites();
}
    

async getUser(){
  const x = await Storage.get({key:'user'});
  return JSON.parse(x.value);
}



  ngAfterViewInit(){
    this.createSkillsChart();
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


  async getFavorites(){
    this.favorites = await this.offer.filterOffer("Favorites");
  }

  

  async addElementModal(element,page) {
    switch (page) {
      case 'education':
        page = AddEducationPage;
        break;
      case 'idioma':
        page = AddLanguagePage;
      break;
      case 'interest':
        page = AddInterestsPage;
        break;
      case 'skill':
        page = AddSkillPage;
      break;
      case 'experience':
        page = AddExperiencePage;
        break;
      default:
        break;
    }
    const modal = await this.modalController.create({
      component: page,
      mode: 'ios',
      swipeToClose: true,
      componentProps: { 'data': element}
    });
    modal.onDidDismiss().then((data) => {
      
    });
    return await modal.present();
  }

  deleteLanguage(element){
    this.presentAlertConfirm(element,'idiomas');
  }

  deleteSkill(element){
    this.presentAlertConfirm(element,'habilidades');
  }
  deleteInterest(element){
    this.presentAlertConfirm(element,'intereses');

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


  async preferences() {
    const modal = await this.modalController.create({
      component: PrefernciasModalPage,
      presentingElement: this.routerOutlet.parentOutlet.nativeEl,
      mode: 'ios',
      swipeToClose: true
    });

    modal.onDidDismiss()
    .then((data) => {
      console.log(data);
     
  });

    return await modal.present();
  }

  async presentAlertConfirm(element,type) {
    const user = await this.getUser()
    let x = type.substring(0, type.length - 1);
    if(type == "habilidades" || type == "intereses") x = type.substring(0, type.length - 2);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar ' + x,
      message: 'Deseas eliminar ' + x + " " + "<b>"+element+"</b>" + "?",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this.firestore.update_userDetails(user['uid'],type,element); //Si es igual this.element entonces lo borra
          }
        }
      ]
    });

    await alert.present();
  }

  

  segmentChanged(ev: any) {
    if(this.selected == "fav"){
      this.transform = false;
    }
    this.ngAfterViewInit();
    console.log('Segment changed', ev);
    this.selected = ev.detail.value;
  }


  goBack(){
    this.location.back();
  }

  randomScalingFactor(){
    return  Math.round(Math.random() * 100);
  }

  createSkillsChart() {
    this.chart = new Chart(this.userSkills.nativeElement, {
      type: 'radar',
			data: {
				labels: ['Liderazgo', 'Empatía', 'Trabajo en equipo', 'Motivación'],
				datasets: [{
					label: 'My First dataset',
					backgroundColor: 'rgba(56, 128, 255,.2)',
					borderColor:'#4c8dff',
          pointBackgroundColor: '#3880ff',
          
					data: [
            this.randomScalingFactor(),
            this.randomScalingFactor(),
						this.randomScalingFactor(),
						this.randomScalingFactor(),
					]
				}]
      },
			options: {
        elements: {
					line: {
            tension: 0.2,
					}
				},
				legend: {
					display:false
				},
				scale: {

          beginAtZero: true,
          ticks:{
            display: false,
            suggestedMin: 50,
            suggestedMax: 100
          }
        },
      }
    });
  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Cerrar Sesión',
        role: 'destructive',
        handler: () => {
          this.auth.SignOut();
          this.presentLoading();
          console.log('cerrar sesion');
        }
      }, {
        text: 'Descagar Mapa de Habilidades',
        handler: () => {
          console.log('Share clicked');
        }
      },  {
        text: 'Preferencias',
        handler: () => {
          this.preferences();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentModal(Offer) {
    const modal = await this.modalCtrl.create({
      component: OfferModalPage,
      cssClass: 'offer-modal',
      swipeToClose: true,
      animated: true,
      showBackdrop: true,
      presentingElement: this.routerOutlet.parentOutlet.nativeEl,
      mode: 'ios',
      componentProps: { 'data': Offer }
    });
    return await modal.present();
  }

  cardPressed(Offer) {
    this.presentModal(Offer);
  }

}
