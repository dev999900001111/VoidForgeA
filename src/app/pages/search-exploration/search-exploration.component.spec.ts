import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchExplorationComponent } from './search-exploration.component';

describe('SearchExplorationComponent', () => {
  let component: SearchExplorationComponent;
  let fixture: ComponentFixture<SearchExplorationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchExplorationComponent]
    });
    fixture = TestBed.createComponent(SearchExplorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
