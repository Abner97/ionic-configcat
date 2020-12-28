import { TestBed } from '@angular/core/testing';

import { RoxGuard } from './rox.guard';

describe('RoxGuard', () => {
  let guard: RoxGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoxGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
