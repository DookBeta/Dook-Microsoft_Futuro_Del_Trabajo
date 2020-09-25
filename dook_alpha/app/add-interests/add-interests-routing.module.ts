import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddInterestsPage } from './add-interests.page';

const routes: Routes = [
  {
    path: '',
    component: AddInterestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddInterestsPageRoutingModule {}
