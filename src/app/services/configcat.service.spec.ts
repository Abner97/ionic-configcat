import { TestBed } from '@angular/core/testing';

import { ConfigcatService } from './configcat.service';

describe('ConfigcatService', () => {
  let service: ConfigcatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigcatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
