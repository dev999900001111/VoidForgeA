import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step01RequirementsComponent } from './step01-requirements.component';

describe('Step01RequirementsComponent', () => {
  let component: Step01RequirementsComponent;
  let fixture: ComponentFixture<Step01RequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step01RequirementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Step01RequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
