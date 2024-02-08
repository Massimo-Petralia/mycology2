import { TestBed } from '@angular/core/testing';

import { SharedParametersService } from './shared-parameters.service';

describe('SharedParametersService', () => {
  let service: SharedParametersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedParametersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
