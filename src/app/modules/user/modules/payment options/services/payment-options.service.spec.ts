import { TestBed } from '@angular/core/testing';

import { PaymentOptionsService } from './payment-options.service';

describe('PaymentOptionsService', () => {
  let service: PaymentOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
