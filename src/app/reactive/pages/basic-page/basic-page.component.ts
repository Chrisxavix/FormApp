import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css'
})
export class BasicPageComponent {
  /* public myForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    price: new FormControl(0),
    inStorage: new FormControl(0),
  }); */

  constructor(
    private fb: FormBuilder,
  ) {}

  public myForm: FormGroup = this.fb.group({
    name: ["", [ Validators.required, Validators.minLength(3) ]],
    price: [0],
    inStorage: [0],
  })

  onSave():void {
    console.log("DataForm: ", this.myForm.value);
    console.log("Form: ", this.myForm.valid);
  }
}
