import { TestBed } from '@angular/core/testing';

import { ConfigcatGuard } from './configcat.guard';

describe('ConfigcatGuard', () => {
  let guard: ConfigcatGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConfigcatGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
