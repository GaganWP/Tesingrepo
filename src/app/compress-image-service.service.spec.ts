import { TestBed, inject } from '@angular/core/testing';

import { CompressImageServiceService } from './compress-image-service.service';

describe('CompressImageServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompressImageServiceService]
    });
  });

  it('should be created', inject([CompressImageServiceService], (service: CompressImageServiceService) => {
    expect(service).toBeTruthy();
  }));
});
