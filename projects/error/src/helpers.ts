import { isObservable, Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';

import { AsyncResponse } from './lib/error-management-strategy';

export const fromAsyncResponse = <T>(res: AsyncResponse<T>): Observable<T> => {
  if (isObservable(res)) {
    return res;
  }

  return fromPromise(Promise.resolve(res));
};
