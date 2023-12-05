import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharingSettingsComponent } from './sharing-settings.component';

describe('SharingSettingsComponent', () => {
  let component: SharingSettingsComponent;
  let fixture: ComponentFixture<SharingSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharingSettingsComponent]
    });
    fixture = TestBed.createComponent(SharingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
