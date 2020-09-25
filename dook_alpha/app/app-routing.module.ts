import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'offer-modal',
    loadChildren: () => import('./offer-modal/offer-modal.module').then( m => m.OfferModalPageModule)
  },
  {
    path: 'interests',
    loadChildren: () => import('./interests/interests.module').then( m => m.InterestsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'personal-details',
    loadChildren: () => import('./personal-details/personal-details.module').then( m => m.PersonalDetailsPageModule)
  },
  {
    path: 'add-education',
    loadChildren: () => import('./add-education/add-education.module').then( m => m.AddEducationPageModule)
  },
  {
    path: 'add-language',
    loadChildren: () => import('./add-language/add-language.module').then( m => m.AddLanguagePageModule)
  },
  {
    path: 'preferncias-modal',
    loadChildren: () => import('./preferncias-modal/preferncias-modal.module').then( m => m.PrefernciasModalPageModule)
  },
  {
    path: 'add-skill',
    loadChildren: () => import('./add-skill/add-skill.module').then( m => m.AddSkillPageModule)
  },
  {
    path: 'add-interests',
    loadChildren: () => import('./add-interests/add-interests.module').then( m => m.AddInterestsPageModule)
  },
  {
    path: 'add-experience',
    loadChildren: () => import('./add-experience/add-experience.module').then( m => m.AddExperiencePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'recover',
    loadChildren: () => import('./recover/recover.module').then( m => m.RecoverPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
