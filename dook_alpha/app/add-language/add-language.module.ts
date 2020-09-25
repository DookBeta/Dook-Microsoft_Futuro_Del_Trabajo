import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLanguagePageRoutingModule } from './add-language-routing.module';
import { CountryService } from '../services/country.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddLanguagePageRoutingModule
  ],
  providers:[
    CountryService
  ],
  declarations: []
})
export class AddLanguagePageModule {


  
 
}

