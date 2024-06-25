import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.css'
})
export class DynamicPageComponent {

  constructor(
    private fb: FormBuilder,
  ) {

  }

  public myForm: FormGroup = this.fb.group({
    name: ["", Validators.required],
    favoriteGames: this.fb.array([
      ["Metal Gear", Validators.required],
      ["Death Stranding", Validators.required],
    ])
  })

  public newFavorite: FormControl = new FormControl("", [Validators.required])

  get favoriteGames() {
    return this.myForm.get("favoriteGames") as FormArray;
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }

  getFieldError(field: string): string | null {
    console.log("field: ", field);

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

  onSubmit(): void {
    console.log("this.myForm.value: ", this.myForm.value);
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }

  onDelete(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  addToFavorites():void {
    if(this.newFavorite.invalid) return;
    this.favoriteGames.push(
      this.fb.control(this.newFavorite.value, Validators.required),
    )
    this.newFavorite.reset();
  }

}
