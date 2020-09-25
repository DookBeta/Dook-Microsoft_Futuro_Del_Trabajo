import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
// import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from '../environments/environment';
import { OfferModalPage } from './offer-modal/offer-modal.page';

import {HttpClientModule} from '@angular/common/http';
import { Vibration } from '@ionic-native/vibration/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { IonicSelectableModule } from 'ionic-selectable';
import { PopoverComponent } from './popover/popover.component';
import { OfferModalPageModule } from './offer-modal/offer-modal.module';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import { AddEducationPage } from './add-education/add-education.page';
import { AddEducationPageModule } from './add-education/add-education.module';

import { NgSelectModule } from '@ng-select/ng-select';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { AddLanguagePage } from './add-language/add-language.page';
import { AddLanguagePageModule } from './add-language/add-language.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { PrefernciasModalPage } from './preferncias-modal/preferncias-modal.page';
import { AddSkillPage } from './add-skill/add-skill.page';
import { AddExperiencePage } from './add-experience/add-experience.page';
import { AddInterestsPage } from './add-interests/add-interests.page';
import { AddInterestsPageModule } from './add-interests/add-interests.module';
import { AddSkillPageModule } from './add-skill/add-skill.module';
import { AddExperiencePageModule } from './add-experience/add-experience.module';




@NgModule({
  declarations: [
    AppComponent,
    OfferModalPage,
    PopoverComponent,
    AddEducationPage,
    AddLanguagePage,
    AddSkillPage,
    AddExperiencePage,
    AddInterestsPage,
    PrefernciasModalPage,    
  ],
  entryComponents: [PopoverComponent,PrefernciasModalPage],
  imports: [
    BrowserModule, 
    AutoCompleteModule,
    IonicModule.forRoot(), 
    AppRoutingModule, 
    OfferModalPageModule,
    HttpClientModule,
    AddEducationPageModule,
    AddLanguagePageModule,
    AddInterestsPageModule,
    AddSkillPageModule,
    AddExperiencePageModule,
    IonicSelectableModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgSelectModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    Vibration,
    StatusBar,
    IonicSelectableModule,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InAppBrowser
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
