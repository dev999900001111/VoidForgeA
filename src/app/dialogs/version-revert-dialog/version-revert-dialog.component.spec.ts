import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionRevertDialogComponent } from './version-revert-dialog.component';

describe('VersionRevertDialogComponent', () => {
  let component: VersionRevertDialogComponent;
  let fixture: ComponentFixture<VersionRevertDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VersionRevertDialogComponent]
    });
    fixture = TestBed.createComponent(VersionRevertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
