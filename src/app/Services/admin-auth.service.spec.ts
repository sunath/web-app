import { TestBed } from '@angular/core/testing';

import { AdminAuthGuard } from './admin-auth.service';

describe('AdminAuthService', () => {
  let service: AdminAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
