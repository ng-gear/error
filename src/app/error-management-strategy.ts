import { AbstractControl, ValidationErrors } from '@angular/forms';

import { of, Observable } from 'rxjs';

import { NggErrorManagementStrategy } from '../../projects/error/src/lib/error-management-strategy';

const errorTypes = ['required', 'pattern', 'maxlength'];
const errorMessages: any = {
  required: 'The field is required',
  pattern: 'Invalid format'
};

export class ErrorManagementStrategy implements NggErrorManagementStrategy {
  showError(errors: ValidationErrors, control: AbstractControl): boolean {
    return control.touched;
  }

  getPriorErrorType(errors: ValidationErrors, path: string[] | null): Observable<string> {
    const errorType = errorTypes.find((type) => errors.hasOwnProperty(type))!;
    return of(errorType);
  }

  getErrorMessage(errors: ValidationErrors, type: string, path: string[] | null): Promise<string> {
    if (type === 'maxlength') {
      return Promise.resolve(`Should be less then ${errors[type].requiredLength}`);
    }

    return Promise.resolve(errorMessages[type] ?? errors[type]);
  }
}
