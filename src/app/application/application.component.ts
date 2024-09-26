import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-application',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'] // Corrected from styleUrl to styleUrls
})
export class applicationComponent {
download() {
throw new Error('Method not implemented.');
}
suspend() {
throw new Error('Method not implemented.');
}
deactivate() {
throw new Error('Method not implemented.');
}
activate() {
throw new Error('Method not implemented.');
}
view() {
throw new Error('Method not implemented.');
}
closeModal() {
throw new Error('Method not implemented.');
}
showModal: any;
openModal() {
throw new Error('Method not implemented.');
}
  applications = [
    { number: '01', systemId: 'SYS001', name: 'Ubunifu', domain: 'ubunifu.ega.go.tz', url: 'https://ubunifu.ega.go.tz/', callbackUrl: 'https://ubunifu.ega.go.tz/auth/callback' },
    // Add other application entries
  ];

  isDropdownOpen = false;
  isFormModelOpen = false;

  toggleDropdown2() {
    console.log(this.isDropdownOpen);

    this.isDropdownOpen = !this.isDropdownOpen;
  }


  toggleDropdown(event: Event, menuId: string) {
    event.stopPropagation();
    const menu = document.getElementById(menuId);
    if (menu) {
      menu.classList.toggle('show');
    }
  }

  toggleModel(){
    this.isFormModelOpen = !this.isFormModelOpen
  }

  performAction(action: string) {
    // Implement action logic here
  }
}


import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';

@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({ uri: 'https://your-graphql-api.com/graphql' }),
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class AppModule {}
