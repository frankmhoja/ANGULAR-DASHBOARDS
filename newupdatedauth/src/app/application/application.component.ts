import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent {
[x: string]: any;
applications = [
  { number: '01', systemId: 'SYS001', name: 'Ubunifu', domain: 'ubunifu.ega.go.tz', url: 'https://ubunifu.ega.go.tz/', callbackUrl: 'https://ubunifu.ega.go.tz/auth/callback' },
  // Add other application entries
];

toggleDropdown(event: Event, menuId: string) {
  event.stopPropagation();
  const menu = document.getElementById(menuId);
  if (menu) {
    menu.classList.toggle('show');
  }
}

performAction(action: string){}






}
