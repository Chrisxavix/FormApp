import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const RTX5089 = {
  name: "Trajeta",
  price: 12,
  inStorage: 8
}

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css'
})
export class BasicPageComponent implements OnInit {
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
    price: [null, [Validators.required, Validators.min(1)]],
    inStorage: [null, [Validators.required, Validators.min(1)]]
  })

  ngOnInit(): void {
    //this.myForm.reset(RTX5089);
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    if(!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {};
    for(const key of Object.keys(errors)) {
      switch(key) {
        case "required":
          return "Este campo es requerido"

        case "minlength":
          return `Mínimo ${ errors["minlength"].requiredLength} caracteres`

        case "min":
          return `Mínimo de valor ${ errors["min"].min} caracteres`

        default:
          return  "xD"
      }
    }
    return null;
  }

  onSave():void {
    if(this.myForm.invalid) {
      console.log("Form inválido");
      this.myForm.markAllAsTouched();
      return;
    }
    /* console.log("DataForm: ", this.myForm.value);
    console.log("Form: ", this.myForm.valid);
    this.myForm.reset({ price: 19, name: "David", inStorage: 119}); */
  }
}
