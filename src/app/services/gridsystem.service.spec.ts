import { TestBed } from '@angular/core/testing';

import { GridsystemService } from './gridsystem.service';

describe('GridsystemService', () => {
  let service: GridsystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridsystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
