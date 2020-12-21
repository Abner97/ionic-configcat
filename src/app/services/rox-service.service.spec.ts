import { TestBed } from '@angular/core/testing';

import { RoxServiceService } from './rox-service.service';

describe('RoxServiceService', () => {
  let service: RoxServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoxServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
