import { TestBed } from '@angular/core/testing';

import { UserdatafetcherService } from './userdatafetcher.service';

describe('UserdatafetcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserdatafetcherService = TestBed.get(UserdatafetcherService);
    expect(service).toBeTruthy();
  });
});
