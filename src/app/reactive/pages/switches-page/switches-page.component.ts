import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styleUrl: './switches-page.component.css'
})
export class SwitchesPageComponent {

  constructor(
    private fb: FormBuilder,
  ) {}

  public myForm: FormGroup = this.fb.group({
    gender: ["M", Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  })

  onSave() {
    console.log("xD: ", this.myForm.controls);
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log("Save: ", this.myForm.value);
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

}
