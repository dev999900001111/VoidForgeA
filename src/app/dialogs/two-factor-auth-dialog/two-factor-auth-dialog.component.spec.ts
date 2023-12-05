import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorAuthDialogComponent } from './two-factor-auth-dialog.component';

describe('TwoFactorAuthDialogComponent', () => {
  let component: TwoFactorAuthDialogComponent;
  let fixture: ComponentFixture<TwoFactorAuthDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TwoFactorAuthDialogComponent]
    });
    fixture = TestBed.createComponent(TwoFactorAuthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
