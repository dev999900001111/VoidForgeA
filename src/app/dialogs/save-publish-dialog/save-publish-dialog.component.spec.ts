import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePublishDialogComponent } from './save-publish-dialog.component';

describe('SavePublishDialogComponent', () => {
  let component: SavePublishDialogComponent;
  let fixture: ComponentFixture<SavePublishDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SavePublishDialogComponent]
    });
    fixture = TestBed.createComponent(SavePublishDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
