import { TestBed } from '@angular/core/testing';

import { HttpdatafetcherService } from './httpdatafetcher.service';

describe('HttpdatafetcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpdatafetcherService = TestBed.get(HttpdatafetcherService);
    expect(service).toBeTruthy();
  });
});
