import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  controlFieldIsInvalid(form: FormGroup, controlName: string) {
    return form.get(controlName)!.hasError('required');
  }
}
