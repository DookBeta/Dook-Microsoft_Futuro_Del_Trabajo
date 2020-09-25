import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { AddEducationPageRoutingModule } from './add-education-routing.module';
import { UniversitiesService } from '../services/universities.service';
import { ProfilePage } from '../profile/profile.page';




@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AddEducationPageRoutingModule
  ],
  providers:[
    UniversitiesService,
    ProfilePage
  ],
  declarations: []
})
export class AddEducationPageModule {}
