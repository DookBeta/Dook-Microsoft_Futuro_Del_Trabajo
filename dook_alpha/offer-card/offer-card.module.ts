import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { OfferCardComponent } from './offer-card.component';



@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [OfferCardComponent],
  exports: [OfferCardComponent]
})
export class OfferCardComponentModule {}
