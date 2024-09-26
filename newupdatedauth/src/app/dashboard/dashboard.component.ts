import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
 // styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  showApplications = false;

  toggleApplications() {
    this.showApplications = !this.showApplications;
  }
}
