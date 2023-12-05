import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step02FeatureComponent } from './step02-feature.component';

describe('Step02FeatureComponent', () => {
  let component: Step02FeatureComponent;
  let fixture: ComponentFixture<Step02FeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step02FeatureComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Step02FeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
