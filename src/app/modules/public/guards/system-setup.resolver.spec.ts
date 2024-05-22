import { TestBed } from '@angular/core/testing';

import { SystemSetupResolver } from './system-setup.resolver';

describe('SystemSetupResolver', () => {
  let resolver: SystemSetupResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SystemSetupResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
