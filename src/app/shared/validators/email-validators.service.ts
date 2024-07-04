import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorsService implements AsyncValidator {

  constructor() { }

  /* validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    console.log("email", email);
    return of({
      emailTaken: true
    }).pipe(
      delay(3000)
    )
  } */

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    const httCallObservable = new Observable<ValidationErrors|null> ( (subscriber) => {
      console.log("email", email);
      if(email === "chris@outlook.com") {
        subscriber.next({ emailTaken: true});
        subscriber.complete();
        return;
      }
      subscriber.next(null);
      subscriber.complete();
    }).pipe(
      delay(3000)
    )


    return httCallObservable;
  }

}
