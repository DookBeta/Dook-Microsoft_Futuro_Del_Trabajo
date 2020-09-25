import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AnimationController, IonTabs } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirestoreService } from '../firestore.service';
import { Storage } from '@capacitor/core';
import { CurrentUserService } from '../shared/current-user.service';





@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  
  activeTab:string = "tab2";
  add:boolean = false;
  hideTabBar: boolean = false;

  hide;
  show;
  user_photoURL = null;
  constructor(public animationCtrl: AnimationController, public modalCtrl: ModalController, private statusBar: StatusBar, private firestore : FirestoreService,
    private user: CurrentUserService) {
    
  }

  async ionViewWillEnter(){
    let user = await this.user.getUser();
    this.user_photoURL = user['photoURL'];
  }

  ionTabsWillChange(ev){
    this.activeTab = ev.tab;
    console.log(this.activeTab);
  }

  btn(){
    this.add = !this.add;
  }

  scrollFunction(ev){
    this.hide = ev.show;
    this.show = ev.hide;
  }

}
