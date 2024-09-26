import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RouterOutlet } from '@angular/router'; // This is automatically included via RouterModule
import { DashboardComponent } from './dashboard.component';
// Import your components 
import { ApplicationComponent } from '../application/application.component';

// Define routes for child components
const routes: Routes = [
  { path: '', component: ApplicationComponent },
];

@NgModule({
  declarations: [
    DashboardComponent,
    ApplicationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }