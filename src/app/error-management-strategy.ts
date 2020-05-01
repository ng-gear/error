import { AbstractControl, ValidationErrors } from '@angular/forms';

import { of, Observable } from 'rxjs';

import { NggErrorManagementStrategy } from '../../projects/error/src/lib/error-management-strategy';

const errorTypes = ['required', 'pattern', 'maxlength'];
const ERROR_MESSAGES: any = {
  required: 'The field is required',
  pattern: 'Invalid format'
};

export class ErrorManagementStrategy implements NggErrorManagementStrategy {
  showError(errors: ValidationErrors, control: AbstractControl): boolean {
    return control.touched;
  }

  getPriorErrorType(errors: ValidationErrors, identifier: string | null): Observable<string> {
    const errorType = errorTypes.find((type) => errors.hasOwnProperty(type))!;
    return of(errorType);
  }

  getErrorMessage(type: string, error: any, identifier: string | null): Promise<string> {
    if (type === 'maxlength') {
      return Promise.resolve(`Should be less then ${error.requiredLength}`);
    }

    return Promise.resolve(ERROR_MESSAGES[type] ?? error);
  }
}
