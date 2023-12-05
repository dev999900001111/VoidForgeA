import { TestBed } from '@angular/core/testing';

import { FService } from './f.service';

describe('FService', () => {
  let service: FService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
