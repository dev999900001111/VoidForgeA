import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersSortOptionsComponent } from './filters-sort-options.component';

describe('FiltersSortOptionsComponent', () => {
  let component: FiltersSortOptionsComponent;
  let fixture: ComponentFixture<FiltersSortOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FiltersSortOptionsComponent]
    });
    fixture = TestBed.createComponent(FiltersSortOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
