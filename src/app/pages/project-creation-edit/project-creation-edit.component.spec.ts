import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCreationEditComponent } from './project-creation-edit.component';

describe('ProjectCreationEditComponent', () => {
  let component: ProjectCreationEditComponent;
  let fixture: ComponentFixture<ProjectCreationEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProjectCreationEditComponent]
    });
    fixture = TestBed.createComponent(ProjectCreationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
