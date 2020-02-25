import { isObservable, Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';

import { AsyncResponse } from './lib/error-management-strategy';

export const fromAsyncResponse = <T>(x: AsyncResponse<T>): Observable<T> => {
  if (isObservable(x)) {
    return x;
  }

  return fromPromise(Promise.resolve(x));
};
