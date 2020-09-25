import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrefernciasModalPage } from './preferncias-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PrefernciasModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrefernciasModalPageRoutingModule {}
