import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { FirestoreService } from '../firestore.service';
import { Storage } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';


@Injectable({
  providedIn: 'root'
})
export class OfferService {
  OfferListRef: AngularFireList<any>;
  OfferRef: AngularFireList<any>;
  Offers = [];
  currentUserFavorites;

  constructor(private firestore: FirestoreService, private toastCtrl: ToastController, private vibration: Vibration) {

  }


  createOffer() {
    return this.OfferListRef.push({
      tagsNumber: 5,
      title: "Pito Title",
      location: "Offer popation",
      content: "Offer konten",
      level: "Maestria",
      duration: "2 meses",
      date: "22 de julio",
      img: "image",
      logo: "logo",
      url: "pedo",
      payment: true,
      supervisorName: "Sergio Ramos",
      maxCapacity: 30,
      currentCapacity: 1,
      timeDemand: [4, "horas", "semanales"],
      amount: 10000,
      AofI: ['Matematicas', 'Lengua', 'Biologia'],
      SofI: ['UX', 'UI', 'Artificial Intelligence'],
    })
  }


  delay() {

    return new Promise(resolve => {
      setTimeout(() => {
        resolve("Resolved")
      }, 1000);
    })
  }

  async updateFavorites(){
    //Obtener datos de usuario.....
    const user = await this.getUser();
    console.log("Datos de usuario obtenidos...")
    return new Promise(resolve => {
    this.firestore.get_users(user.uid).subscribe((res)=>{
      let r = res.map(e=>{
        let detail = e.payload.doc.data();
        let favorites = detail['favorites'] ? detail['favorites'] : []
        //Si ya esta lleno, entonces resovler
        favorites ? resolve(favorites) : [] 
      })
    })
  })
      
    
    this.firestore.get_userDetails(user.uid).subscribe((res) => {
        //Obtener IDs de los favoritos, si no tiene solo dejar array vacio
        this.currentUserFavorites = res['favorites'];
        //HARDCODE timer manual
          console.log("favorites updated...")
      });
  }

  // Filter List
  async filterOffer(type) {
    this.Offers = [];
    //Si se quiere ver toda la oferta...
    this.currentUserFavorites = await this.updateFavorites();
    if (type == "Todo") {
      return new Promise(resolve => {
        this.firestore.get_offers().subscribe((res) => {
          const offer = res.map(e => {
            //Obtener oferta y asignar valor de id de parent e icono de like
            let element = e.payload.doc.data();
            element['id'] = e.payload.doc.id;
            //Si el actual elemento es parte de los favoritos del usuario activar el icono de corazon
            if(this.currentUserFavorites.length > 0){
              
            this.activateFavButton(element,this.currentUserFavorites.includes(element['id']))
            console.log("Push a ofertas...")
            } else {
              //No tiene favoritos
              this.activateFavButton(element,false);
            }
            this.Offers.push(element);
          })
          console.log("Offertas filtradas, regresando a vista...")
          resolve(this.Offers);
        });
      })
    } else if(type == "Favorites"){
      return new Promise(resolve => {
        this.firestore.get_offers().subscribe((res) => {
          const offer = res.map(e => {
            //Obtener oferta y asignar valor de id de parent e icono de like
            let element = e.payload.doc.data();
            element['id'] = e.payload.doc.id;
            //Si el actual elemento es parte de los favoritos del usuario activar el icono de corazon y hacer push a this.Offers
            this.activateFavButton(element,this.currentUserFavorites.includes(element['id']));
            if(this.currentUserFavorites.includes(element['id'])){
              this.Offers.push(element);
            }
          })
          resolve(this.Offers);
        });
      })
    }
    else {
      this.firestore.filter_offer_by(type).subscribe((res) => {
        return new Promise(resolve => {
          this.firestore.get_offers().subscribe((res) => {
            const offer = res.map(e => {
              //Obtener oferta y asignar valor de id de parent e icono de like
              let element = e.payload.doc.data();
              element['id'] = e.payload.doc.id;
              //Si el actual elemento es parte de los favoritos del usuario activar el icono de corazon y hacer push a this.Offers
              this.activateFavButton(element,this.currentUserFavorites.includes(element['id']));
              if(element['aofi'] == type){
                this.Offers.push(element);
              }
            })
            resolve(this.Offers);
          });
        })
      })
    }


  }

  async getUser(){
    const x = await Storage.get({key:'user'});
    return JSON.parse(x.value);
  }


  activateFavButton(element,condition){
    console.log("Activando icono...")
    if (condition) {
      element['icon'] = {
        name: "heart",
        color: "danger",
        state: true
      }
    } else {
      element['icon'] = {
        name: "heart-outline",
        color: "dark",
        state: false
      }
    }
  }

  async favorite(offer) {
    console.log(offer['icon'])
     //obtiene usuairo de local storage
    const user = await this.getUser();
    //Si no es favorito -> hacerlo
    if (offer['icon'].state == false) {
      this.activateFavButton(offer,true)
      this.firestore.add_favorite(user['uid'],offer.id)
      await this.updateFavorites();
      this.presentToast(offer)
    } else {
      //Quitar de favoritos
      this.activateFavButton(offer,false)
      this.firestore.remove_favorite(user['uid'],offer.id);
      await this.updateFavorites();
    }
    this.vibration.vibrate(50);
  }

  
  async presentToast(Offer) {
    const toast = await this.toastCtrl.create({
      message: Offer.title + ' se ha añadido a favoritos.',
      duration: 2000,
      position: 'bottom',
      mode: 'ios'
    });
    toast.present();
  }


  // // Update
  // updateoffer(id, apt: Appointment) {
  //   return this.offerRef.update({
  //     name: apt.name,
  //     email: apt.email,
  //     mobile: apt.mobile
  //   })
  // }

  // // Delete
  // deleteoffer(id: string) {
  //   this.offerRef = this.db.object('/appointment/' + id);
  //   this.offerRef.remove();
  // }
}
