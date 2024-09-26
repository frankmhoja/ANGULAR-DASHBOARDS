import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { RegistrationRequest } from '../../model/registration';
import { StartResponse } from '../../model/fido-registration-start';
import { UtilService } from '../../service/util.service';
import { FidoLogin } from '../../model/login';
import { StartLoginResponse } from '../../model/fido-login-start';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  isLoading: boolean = false;

  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  formGroup!: FormGroup;

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _utilService: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.formGroup = this._formBuilder.group({
      email: ['', Validators.required],
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.isLoading = true;
  }

  sendMagicLink(): void {
    if (this.formGroup.value.email === '') {
      this.errorMessage = 'Please provide an email address';
      return;
    } else {
      this.isLoading = true;
      
    }
  } 

  login(): void {
    if (this.formGroup.value.email === '') {
      this.errorMessage = 'Please provide an email address';
      return;
    } else {
      this.isLoading = true;

      let request = new FidoLogin();
      request.email = this.formGroup.value.email;
      this._authService.fidoStartLogin(request).subscribe({
        next: (value) => {
          this.isLoading = false;
          console.log(value), 
          this.createCredentials(value);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = JSON.stringify(err);
        },
      });
    }
  }

  async createCredentials(settings: StartLoginResponse) {
    let creds: { type: any; id: Uint8Array }[] = [];
    settings.assertionRequest.publicKeyCredentialRequestOptions.allowCredentials.forEach(
      (cred: { type: any; id: any }) => {
        const result = {
          type: cred.type,
          id: this._utilService.toByteArray(cred.id),
        };
        creds.push(result);
      }
    );

    const publicKey: PublicKeyCredentialRequestOptions = {
      challenge: this._utilService.toByteArray(
        settings.assertionRequest.publicKeyCredentialRequestOptions.challenge
      ),
      allowCredentials: creds,
    };
    console.log(publicKey);
    let credential = await this.createCreedential(publicKey);
    console.log(credential);
    this.finishRegistration(settings, credential);
  }

  finishRegistration(settings: StartLoginResponse, credential: any | null) {
    if (!credential) {
      return;
    }
    const attestationResponse = credential.response as any;

    const finishRequest = {
      flowId: settings.flowId,
      credential: {
        id: credential.id,
        rawId: this._utilService.fromByteArray(
          new Uint8Array(credential.rawId)
        ),
        type: credential.type,
        response: {
          clientDataJSON: this._utilService.fromByteArray(
            new Uint8Array(attestationResponse.clientDataJSON)
          ),
          authenticatorData: this._utilService.fromByteArray(
            new Uint8Array(attestationResponse.authenticatorData)
          ),
          signature: this._utilService.fromByteArray(
            new Uint8Array(attestationResponse.signature)
          ),
        },
        clientExtensionResults: credential.getClientExtensionResults
          ? credential.getClientExtensionResults()
          : {},
      },
    };

    const loginRequest = {
      username: settings.assertionRequest.username,
      finishRequest: JSON.stringify(finishRequest),
      // startRequest: settings
    };

    this._authService.fidoLogin(finishRequest).subscribe({
      next: (value) => {
        console.log(value);
        console.log('Login successful....');
        localStorage.setItem('bearerToken', value.access_token);
        this.router.navigate(['/welcome']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  createCreedential(
    publicKey: PublicKeyCredentialRequestOptions
  ): Promise<any | null> {
    return navigator.credentials
      .get({ publicKey }) // Note: 'publicKey' is already correctly used here
      .then((newCredentialInfo) => {
        console.log('SUCCESS', newCredentialInfo);
        return newCredentialInfo; // Explicitly cast to PublicKeyCredential
      })
      .catch((error) => {
        console.log('FAIL', error);
        return null; // You can also rethrow the error or handle it differently
      });
  }
}
