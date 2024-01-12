import { TestBed } from '@angular/core/testing';

import { MycologyService } from './mycology.service';

describe('MycologyService', () => {
  let service: MycologyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MycologyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
