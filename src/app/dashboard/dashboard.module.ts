// import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {  RouterModule, Routes } from '@angular/router';
import { RouterOutlet } from '@angular/router'; // This is automatically included via RouterModule
// import { DashboardComponent } from './dashboard.component';
import { applicationComponent } from '../application/application.component';

const routes: Routes = [
  { path: '', component: applicationComponent },
];

// @NgModule({
//   declarations: [
   
//     applicationComponent,
  
  imports: [
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
export class DashboardModule { }

