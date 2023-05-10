import { TestBed } from '@angular/core/testing';

import { InMemoryApiServiceService } from './in-memory-api.service.service';

describe('InMemoryApiServiceService', () => {
  let service: InMemoryApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
