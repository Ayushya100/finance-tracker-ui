import { TestBed } from '@angular/core/testing';

import { PaymentPopupService } from './payment-popup.service';

describe('PaymentPopupService', () => {
  let service: PaymentPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
