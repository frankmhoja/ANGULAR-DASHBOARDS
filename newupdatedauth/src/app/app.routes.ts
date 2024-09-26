import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './ui/login/login.component';
import { RegistrationComponent } from './ui/registration/registration.component';
import { WelcomeComponent } from './ui/welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationComponent } from './application/application.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },

    {path: 'login', redirectTo: 'login', pathMatch: 'full'},
    {path: 'home', component: RegistrationComponent },
    {path: 'register', component: RegistrationComponent},
    {path: 'login', component: LoginComponent},
    {path: 'welcome', component: WelcomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'Application', component:ApplicationComponent},


  ];