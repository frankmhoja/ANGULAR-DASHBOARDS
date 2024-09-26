import { Component, OnInit } from "@angular/core";
import { RouterLink, Router } from "@angular/router";

@Component({
    selector: 'app-sidebar',
    standalone:true,
    imports:[
      RouterLink
    ],
    templateUrl: './sidebar.component.html',
   styleUrls: ['./sidebar.component.css']
  })
  export class SidebarComponent implements OnInit {
   
    
    ngOnInit(): void {
      throw new Error('Method not implemented.');

    }
  }
  