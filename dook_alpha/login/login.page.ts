import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/AuthenticationService';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  focus:boolean = true;
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private alertCtrl: AlertController,
    private loadingController: LoadingController
  ) {
    
  }

  

  ngOnInit() {}

  async presentAlert(mensaje) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      subHeader: 'No se pudo iniciar sesión',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
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


  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        if(this.authService.isEmailVerified) {
          this.presentLoading();   
          this.router.navigate(['tabs']);       
        } else {
          this.presentAlert('Correo no verificado.')
          return false;
        }
      }).catch((error) => {
        this.presentAlert(error.message)
      })
  }
}
