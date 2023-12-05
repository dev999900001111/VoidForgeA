import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareSettingsDialogComponent } from './share-settings-dialog.component';

describe('ShareSettingsDialogComponent', () => {
  let component: ShareSettingsDialogComponent;
  let fixture: ComponentFixture<ShareSettingsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ShareSettingsDialogComponent]
    });
    fixture = TestBed.createComponent(ShareSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
