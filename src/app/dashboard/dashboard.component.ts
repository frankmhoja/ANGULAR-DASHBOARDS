import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports:[
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
 // styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showApplications = false;
  
  toggleApplications() {
    this.showApplications = !this.showApplications;
  }
  constructor( private  router: Router){
  
  }
  
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');

    this.router.navigate(['/dashboard'])
    this.router.navigate(['/dashboard'])
    this.router.navigate(['/dashboard'])
  }
}
import { Component, OnInit } from '@angular/core';
import { ApplicationService } from './application.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  applications: any[] = [];

  constructor(private appService: ApplicationService) {}

  ngOnInit() {
    this.appService.getApplications().subscribe((result: any) => {
      this.applications = result.data.applications;
    });
  }
}

