import { TestBed } from '@angular/core/testing';

import { SearchsharingService } from './searchsharing.service';

describe('SearchsharingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchsharingService = TestBed.get(SearchsharingService);
    expect(service).toBeTruthy();
  });
});
