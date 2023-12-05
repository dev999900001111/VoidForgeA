import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step03FeatureDetailComponent } from './step03-feature-detail.component';

describe('Step03FeatureDetailComponent', () => {
  let component: Step03FeatureDetailComponent;
  let fixture: ComponentFixture<Step03FeatureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step03FeatureDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Step03FeatureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
