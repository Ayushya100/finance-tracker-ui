import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { systemSetupResolver } from './system-setup.resolver';

describe('systemSetupResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => systemSetupResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
