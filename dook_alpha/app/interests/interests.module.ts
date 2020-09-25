import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';


import { InterestsPageRoutingModule } from './interests-routing.module';

import { InterestsPage } from './interests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    InterestsPageRoutingModule
  ],
  declarations: [InterestsPage]
})
export class InterestsPageModule {}
