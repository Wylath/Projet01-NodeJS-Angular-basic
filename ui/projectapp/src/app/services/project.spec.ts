import { ProjectManager } from './project';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProjectManager', () => {
  let service: ProjectManager;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectManager]
    });
    service = TestBed.inject(ProjectManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});