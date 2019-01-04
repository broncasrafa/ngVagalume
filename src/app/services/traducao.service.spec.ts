import { TestBed, inject } from '@angular/core/testing';

import { TraducaoService } from './traducao.service';

describe('TraducaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TraducaoService]
    });
  });

  it('should be created', inject([TraducaoService], (service: TraducaoService) => {
    expect(service).toBeTruthy();
  }));
});
