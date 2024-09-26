import {  Routes } from '@angular/router';
import { LoginComponent } from './ui/login/login.component';
import { RegistrationComponent } from './ui/registration/registration.component';
import { WelcomeComponent } from './ui/welcome/welcome.component';
import { applicationComponent } from './application/application.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { AddDetailsComponent } from './add-details/add-details.component';
import { UsersComponent } from './users/users.component';
import { DescriptionComponent } from './description/description.component';

export const routes: Routes = [

    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'registration', component: RegistrationComponent},
    {path: 'login', component: LoginComponent},
    {path: 'welcome', component: WelcomeComponent},
    {path: 'users', component: UsersComponent},
    {path: 'home', component: HomeComponent},
    {path: '', component: AppComponent},
    {path: 'application', component: applicationComponent},
    {path: 'description', component: DescriptionComponent},
    {path: 'add-details', component: AddDetailsComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'},

  ];
  
  