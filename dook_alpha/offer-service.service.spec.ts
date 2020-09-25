import { TestBed } from '@angular/core/testing';

import { OfferServiceService } from './offer-service.service';

describe('OfferServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfferServiceService = TestBed.get(OfferServiceService);
    expect(service).toBeTruthy();
  });
});
