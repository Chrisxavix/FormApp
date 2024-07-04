import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { EmailValidatorsService } from '../../../shared/validators/email-validators.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidatorsService,

  ) { }

  /* si es síncrono se manda en el mismo array:
    username: ["", [Validators.required, cantBeStrider]],
  */
  public myForm: FormGroup = this.fb.group({
    name: ["", [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    email: ["", [Validators.required, Validators.email, Validators.pattern(this.validatorsService.emailPattern)], [this.emailValidator]],
    username: ["", [Validators.required, this.validatorsService.cantBeStrider]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    password2: ["", [Validators.required]],
  })

  onSubmit(): void {
    this.myForm.markAllAsTouched();
    this.myForm.markAllAsTouched();
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }
}
