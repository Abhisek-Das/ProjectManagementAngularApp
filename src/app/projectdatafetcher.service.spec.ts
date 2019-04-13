import { TestBed } from '@angular/core/testing';

import { ProjectdatafetcherService } from './projectdatafetcher.service';

describe('ProjectdatafetcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectdatafetcherService = TestBed.get(ProjectdatafetcherService);
    expect(service).toBeTruthy();
  });
});
