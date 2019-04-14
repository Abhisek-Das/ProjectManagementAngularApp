import { TestBed } from '@angular/core/testing';

import { ParenttaskdatafetcherService } from './parenttaskdatafetcher.service';

describe('ParenttaskdatafetcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParenttaskdatafetcherService = TestBed.get(ParenttaskdatafetcherService);
    expect(service).toBeTruthy();
  });
});
