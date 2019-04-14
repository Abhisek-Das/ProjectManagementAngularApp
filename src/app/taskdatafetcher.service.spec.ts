import { TestBed } from '@angular/core/testing';

import { TaskdatafetcherService } from './taskdatafetcher.service';

describe('TaskdatafetcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskdatafetcherService = TestBed.get(TaskdatafetcherService);
    expect(service).toBeTruthy();
  });
});
