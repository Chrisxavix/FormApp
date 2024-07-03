import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cantBeStrider } from '../../../shared/validators/validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  constructor(
    private fb: FormBuilder
  ) {

  }

  /* si es síncrono se manda en el mismo array:
    username: ["", [Validators.required, cantBeStrider]],
  */
  public myForm: FormGroup = this.fb.group({
    name: ["", [Validators.required]],
    email: ["", [Validators.required]],
    username: ["", [Validators.required, cantBeStrider]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    password2: ["", [Validators.required]],
  })

  onSubmit(): void {
    if(this.myForm.invalid) {
      console.log("Form inválido");
      this.myForm.markAllAsTouched();
      return;
    }
    console.log("Form inválido", this.myForm.value);
  }

}
