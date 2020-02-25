import { Inject, Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { of, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { fromAsyncResponse } from '../helpers';
import { NggError } from './error';
import { NggErrorManagementStrategy, NGG_ERROR_MANAGEMENT_STRATEGY } from './error-management-strategy';

@Injectable()
export class NggErrorService {
  private readonly managementStrategy: NggErrorManagementStrategy;

  constructor(@Inject(NGG_ERROR_MANAGEMENT_STRATEGY) managementStrategy: NggErrorManagementStrategy) {
    this.managementStrategy = managementStrategy;
  }

  showError(control: AbstractControl): boolean {
    return !!control.errors && this.managementStrategy.showError(control.errors, control);
  }

  getError({ errors }: AbstractControl, path: string[] | null): Observable<NggError | null> {
    if (!errors) {
      return of(null);
    }

    return fromAsyncResponse(this.managementStrategy.getPriorErrorType(errors, path)).pipe(
      switchMap((type) => fromAsyncResponse(this.managementStrategy.getErrorMessage(errors, type, path)).pipe(
        map((message) => new NggError(type, message, errors[type]))
      ))
    );
  }
}
