import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSkillPage } from './add-skill.page';

const routes: Routes = [
  {
    path: '',
    component: AddSkillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSkillPageRoutingModule {}
