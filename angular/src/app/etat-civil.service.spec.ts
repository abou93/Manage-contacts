import { TestBed } from '@angular/core/testing';

import { EtatCivilService } from './etat-civil.service';

describe('EtatCivilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EtatCivilService = TestBed.get(EtatCivilService);
    expect(service).toBeTruthy();
  });
});
