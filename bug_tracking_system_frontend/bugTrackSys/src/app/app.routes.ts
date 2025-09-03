import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';
import { Bug } from './bug/bug';
import { Login } from './login/login';
import { HomePage } from './mainPage/mainPage';
import { PageNotFound } from './pageNotFound/pageNotFound';
import { Project } from './project/project';
import { Signup } from './signup/signup';
// +++++++++++++++++++++++++++ imports ends ++++++++++++++++++++++++++++++

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: 'projects', component: Project, canActivate: [authGuard] },
  {
    path: 'projects/:project_id/bugs',
    component: Bug,
    canActivate: [authGuard],
  },
  { path: '**', component: PageNotFound },
];
