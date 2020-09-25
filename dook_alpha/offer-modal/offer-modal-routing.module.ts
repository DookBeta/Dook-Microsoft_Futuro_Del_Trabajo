import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferModalPage } from './offer-modal.page';

const routes: Routes = [
  {
    path: '',
    component: OfferModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferModalPageRoutingModule {}
