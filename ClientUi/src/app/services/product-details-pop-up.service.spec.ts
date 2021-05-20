import { TestBed } from '@angular/core/testing';

import { ProductDetailsPopUpService } from './product-details-pop-up.service';

describe('ProductDetailsPopUpService', () => {
  let service: ProductDetailsPopUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDetailsPopUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
