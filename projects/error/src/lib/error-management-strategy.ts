import { InjectionToken } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { Observable } from 'rxjs';

export type AsyncResponse<T> = T | Promise<T> | Observable<T>;

export interface NggErrorManagementStrategy {
  pathToIdentifier?(path: string[] | null): string | null;

  showError(errors: ValidationErrors, control: AbstractControl, identifier?: string | null): boolean;
  getPriorErrorType(errors: ValidationErrors, identifier?: string | null): AsyncResponse<string>;
  getErrorMessage(type: string, error: any, identifier?: string | null): AsyncResponse<string>;
}

export const NGG_ERROR_MANAGEMENT_STRATEGY = new InjectionToken('NGG_ERROR_MANAGEMENT_STRATEGY');
