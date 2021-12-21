import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileDetailsComponent } from './user-profile-details/user-profile-details.component';
import { UserProfileSubmitionComponent } from './user-profile-submition/user-profile-submition.component';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { UserProfileSearchComponent } from './user-profile-search/user-profile-search.component';
import { MusicsDashboardComponent } from './musics/musics-dashboard/musics-dashboard.component';
import { MusicMetatagEditComponent } from './musics/music-metatag-edit/music-metatag-edit.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { 
    path: 'user-profile-details',
    pathMatch: 'full',
    component: UserProfileDetailsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'user-profile-submition',
    pathMatch: 'full',
    component: UserProfileSubmitionComponent
  },
  { 
    path: 'user-profile-edit/:id',
    pathMatch: 'full',
    component: UserProfileEditComponent 
  },
  {
    path: 'user-profile-search',
    pathMatch: 'full',
    component: UserProfileSearchComponent
  },
  { 
    path: 'musics-dashboard',
    pathMatch: 'full',
    component: MusicsDashboardComponent,
  },
  { 
    path: 'music-metatag-edit/:id',
    pathMatch: 'full',
    component: MusicMetatagEditComponent
  },
  { 
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent
  },
  { 
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const AppRoutingComponents = [ 
  UserProfileDetailsComponent,
  UserProfileSubmitionComponent, 
  UserProfileEditComponent, 
  UserProfileSearchComponent, 
  MusicsDashboardComponent,
  MusicMetatagEditComponent,
  RegisterComponent,
  LoginComponent
]
