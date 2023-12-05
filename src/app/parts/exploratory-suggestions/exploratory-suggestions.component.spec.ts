import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploratorySuggestionsComponent } from './exploratory-suggestions.component';

describe('ExploratorySuggestionsComponent', () => {
  let component: ExploratorySuggestionsComponent;
  let fixture: ComponentFixture<ExploratorySuggestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExploratorySuggestionsComponent]
    });
    fixture = TestBed.createComponent(ExploratorySuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
