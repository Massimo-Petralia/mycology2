import { TestBed } from '@angular/core/testing';

import { IdManagementService } from './id-management.service';

describe('IdManagementService', () => {
  let service: IdManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
