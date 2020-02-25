import { InjectionToken } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { Observable } from 'rxjs';

export type AsyncResponse<T> = T | Promise<T> | Observable<T>;

export interface NggErrorManagementStrategy {
  showError(errors: ValidationErrors, control: AbstractControl): boolean;
  getPriorErrorType(errors: ValidationErrors, path: string[] | null): AsyncResponse<string>;
  getErrorMessage(errors: ValidationErrors, type: string, path: string[] | null): AsyncResponse<string>;
}

export const NGG_ERROR_MANAGEMENT_STRATEGY = new InjectionToken('NGG_ERROR_MANAGEMENT_STRATEGY');
