import { TestBed, inject } from '@angular/core/testing';

import { ArtistaService } from './artista.service';

describe('ArtistaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtistaService]
    });
  });

  it('should be created', inject([ArtistaService], (service: ArtistaService) => {
    expect(service).toBeTruthy();
  }));
});
