import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor(private apollo: Apollo) {}

  getApplications() {
    return this.apollo.query({
      query: gql`
        query {
          applications {
            id
            systemId
            appName
            domain
            url
            callbackUrl
          }
        }
      `,
    });
  }
}
