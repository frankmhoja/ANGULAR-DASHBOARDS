import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Token } from "../model/Token";
import { RegistrationRequest } from "../model/registration";
import { StartResponse } from "../model/fido-registration-start";
import { FinishResponse } from "../model/fido-registration-finish";
import { FidoLogin } from "../model/login";
import { StartLoginResponse } from "../model/fido-login-start";
import { User } from "../model/user";
import { isPlatformBrowser } from "@angular/common";

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {
  }


  socialLogin(token: string, issuer: string): Observable<Token> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new HttpParams()
      .set('client_id', 'socialClient')
      .set('subject_token_type', 'urn:ietf:params:oauth:token-type:access_token')
      .set('subject_token', token)
      .set('subject_issuer', issuer)
      .set('grant_type', 'urn:ietf:params:oauth:grant-type:token-exchange');
    return this.http.post<Token>(`keycloak/realms/social/protocol/openid-connect/token`, body.toString(), { headers });
  }

  startChallenge(request: RegistrationRequest) {

    return this.http.post<StartResponse>(`auth/webauthn/register/start`, request);
  }

  finishSetUp(request: any) {

    return this.http.post<FinishResponse>(`auth/webauthn/register/finish`, request);
  }


  fidoStartLogin(request: FidoLogin) {

    return this.http.post<StartLoginResponse>(`auth/webauthn/login/start`, request);
  }


  fidoLogin(request: any) {

    return this.http.post<FinishResponse>(`auth/webauthn/login/finish`, request);
  }


  getCurrentUser() {

    let token = null;
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('bearerToken');

    }
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<User>(`auth/user`, { headers });
  }

}
