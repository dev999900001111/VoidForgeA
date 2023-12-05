import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackSubmissionDialogComponent } from './feedback-submission-dialog.component';

describe('FeedbackSubmissionDialogComponent', () => {
  let component: FeedbackSubmissionDialogComponent;
  let fixture: ComponentFixture<FeedbackSubmissionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeedbackSubmissionDialogComponent]
    });
    fixture = TestBed.createComponent(FeedbackSubmissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
