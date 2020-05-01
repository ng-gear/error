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

  pathToIdentifier(path: string[] | null): string | null {
    if (this.managementStrategy.pathToIdentifier) {
      return this.managementStrategy.pathToIdentifier(path);
    }

    return path && path.join('-');
  }

  showError(control: AbstractControl, identifier: string | null): boolean {
    return !!control.errors && this.managementStrategy.showError(control.errors, control, identifier);
  }

  getError({ errors }: AbstractControl, identifier: string | null): Observable<NggError | null> {
    if (!errors) {
      return of(null);
    }

    return fromAsyncResponse(this.managementStrategy.getPriorErrorType(errors, identifier)).pipe(
      switchMap((type) => fromAsyncResponse(this.managementStrategy.getErrorMessage(type, errors[type], identifier)).pipe(
        map((message) => new NggError(type, message, errors[type]))
      ))
    );
  }
}
