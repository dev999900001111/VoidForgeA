import { TestBed } from '@angular/core/testing';

import { ProjectModelService } from './project-model.service';

describe('ProjectModelService', () => {
  let service: ProjectModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
