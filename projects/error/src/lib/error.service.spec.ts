import { TestBed } from '@angular/core/testing';

import { NggErrorService } from './error.service';

describe('ErrorService', () => {
  let service: NggErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NggErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
