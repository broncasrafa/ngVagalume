import { TestBed, inject } from '@angular/core/testing';

import { DiscografiaService } from './discografia.service';

describe('DiscografiaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscografiaService]
    });
  });

  it('should be created', inject([DiscografiaService], (service: DiscografiaService) => {
    expect(service).toBeTruthy();
  }));
});
