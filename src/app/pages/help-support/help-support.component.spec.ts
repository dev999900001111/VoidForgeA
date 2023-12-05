import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpSupportComponent } from './help-support.component';

describe('HelpSupportComponent', () => {
  let component: HelpSupportComponent;
  let fixture: ComponentFixture<HelpSupportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HelpSupportComponent]
    });
    fixture = TestBed.createComponent(HelpSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
