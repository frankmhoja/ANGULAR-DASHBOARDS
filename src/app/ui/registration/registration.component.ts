import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { UtilService } from '../../service/util.service';
import { StartResponse } from '../../model/fido-registration-start';
import { RegistrationRequest } from '../../model/registration';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  fname: string = "";
  lname: string = "";
  username: string = "";
  email: string = "";
  phone: string = "";
  gender: string = "";
  dob: Date | undefined;

  currentStep = 1;

  // Error message for validation
  errorMessage: string = "";
  isLoading: boolean = false;

  // Regular expression for validating an email address
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  formGroup!: FormGroup;

  constructor(private _authService: AuthService,
              private _formBuilder: FormBuilder,
              private _utilService: UtilService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.formGroup = this._formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      uname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required]
    });
  }

  goToNextStep() {
    const formValue = this.formGroup.value;

    if (!formValue.fname || !formValue.lname || !formValue.uname || !formValue.email) {
      this.errorMessage = "Please fill out all fields before proceeding.";
    } else if (!this.emailPattern.test(formValue.email)) {
      this.errorMessage = "Please enter a valid email address.";
    } else {
      this.errorMessage = "";
      this.currentStep = 2;
    }
  }

  goToPreviousStep() {
    this.currentStep = 1;
  }

  async onSubmit(event: Event) {
    event.preventDefault();

    const formValue = this.formGroup.value;

    this.phone = formValue.phone || '';
    const selectedGender = this.formGroup.get('gender')?.value;

    if (this.phone.length < 12 || this.phone.length > 12) {
      this.errorMessage = "Phone number must be 12 digits starting with 255 and no space.";
      return;
    }

    if (selectedGender !== 'M' && selectedGender !== 'F') {
      this.errorMessage = "Invalid Gender.";
      return;
    }

    const dobString = formValue.dob;
    if (dobString) {
      const dob = new Date(dobString);
      const today = new Date();
      
      if (dob > today) {
        this.errorMessage = "Date of Birth cannot be in the future.";
        return;
      }
    } else {
      this.errorMessage = "Date of Birth is required.";
      return;
    }

    return this.registration();
  }

  registration(): void {

    this.isLoading = true;

    let request = new RegistrationRequest();
    request.fname = this.formGroup.value.fname?.trim();
    request.lname = this.formGroup.value.lname?.trim();
    request.username = this.formGroup.value.uname?.trim();
    request.email = this.formGroup.value.email?.trim();
    request.phone = this.formGroup.value.phone?.trim();
    request.gender = this.formGroup.value.gender?.trim();
    request.dob = this.formGroup.value.dob?.trim();
    
    this._authService.startChallenge(request)
      .subscribe({
        next: value => {
          console.log(value);
          this.errorMessage = JSON.stringify(value);
          this.registerCredentials(value);
        },
        error: err => {
          this.isLoading = false;
          this.errorMessage = JSON.stringify(err);
        }
      });
    
    this.isLoading = false;
  }

  async registerCredentials(settings: StartResponse) {

    const publicKey: PublicKeyCredentialCreationOptions = {
      challenge: this._utilService.toByteArray(settings.credentialCreationOptions.challenge),
      rp: {
        name: settings.credentialCreationOptions.rp.name,
        id: settings.credentialCreationOptions.rp.id,
      },
      user: {
        name: settings.credentialCreationOptions.user.name,
        displayName: settings.credentialCreationOptions.user.displayName,
        id: this._utilService.toByteArray(settings.credentialCreationOptions.user.id)
      },
      pubKeyCredParams: settings.credentialCreationOptions.pubKeyCredParams,
      attestation: settings.credentialCreationOptions.attestation
    };
    
    let credential = await this.createCredential(publicKey);
    this.finishRegistration(settings, credential);
  }

  finishRegistration(settings: StartResponse, credential: PublicKeyCredential | null) {

    if (!credential) {
      return;
    }

    const attestationResponse = credential.response as AuthenticatorAttestationResponse;

    const finishRequest = {
      flowId: settings.flowId,
      credential: {
        id: credential.id,
        rawId: this._utilService.fromByteArray(new Uint8Array(credential.rawId)),
        type: credential.type,
        response: {
          clientDataJSON: this._utilService.fromByteArray(new Uint8Array(attestationResponse.clientDataJSON)),
          attestationObject: this._utilService.fromByteArray(new Uint8Array(attestationResponse.attestationObject))
        },
        clientExtensionResults: credential.getClientExtensionResults ? credential.getClientExtensionResults() : {}
      }
    };

    this._authService.finishSetUp(finishRequest)
      .subscribe({
        next: value => {
          console.log(value);
        },
        error: err => {
          this.errorMessage = err;
        }
      });
  }

  createCredential(publicKey: PublicKeyCredentialCreationOptions): Promise<PublicKeyCredential | null> {
    return navigator.credentials.create({ publicKey })
      .then((newCredentialInfo) => {
        this.errorMessage = "SUCCESS " + newCredentialInfo;
        console.log('SUCCESS', newCredentialInfo);
        return newCredentialInfo as PublicKeyCredential;
      })
      .catch((error) => {
        this.errorMessage = "FAIL " + error;
        console.log('FAIL', error);
        return null;
      });
  }
}
