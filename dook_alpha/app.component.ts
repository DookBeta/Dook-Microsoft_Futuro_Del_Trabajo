import { Component } from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthenticationService } from './shared/AuthenticationService';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthenticationService,
    private loadingController: LoadingController
  ) {
    this.initializeApp();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'custom-loading',
      message: 'Espere...',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.authService.isLoggedIn().then((userLogged)=>{
        if(userLogged){
          this.presentLoading();
          this.router.navigateByUrl('tabs');
        } else {
          this.router.navigateByUrl('login');
        }
        this.statusBar.styleDefault();
      this.splashScreen.hide();
      }); 
    });
  }
}
