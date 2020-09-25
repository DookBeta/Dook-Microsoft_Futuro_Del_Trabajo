import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEducationPage } from './add-education.page';

const routes: Routes = [
  {
    path: '',
    component: AddEducationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEducationPageRoutingModule {}
