import { TestBed } from '@angular/core/testing';

import { ProgressBarService } from './progress.service';

describe('ProgressService', () => {
  let service: ProgressBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
