import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddExperiencePage } from './add-experience.page';

const routes: Routes = [
  {
    path: '',
    component: AddExperiencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddExperiencePageRoutingModule {}
