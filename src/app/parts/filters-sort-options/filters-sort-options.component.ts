// src/app/parts/filters-sort-options.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filter, FilterType } from '../../models/models';
import { SearchService } from '../../services';
import { AppCommonModule } from 'src/app/app-common.module';

@Component({
    selector: 'app-filters-sort-options',
    templateUrl: './filters-sort-options.component.html',
    styleUrls: ['./filters-sort-options.component.scss'],
    standalone: true,
    imports: [AppCommonModule],
})
export class FiltersSortOptionsComponent implements OnInit {

    // Holds the currently selected values for binding with the dropdowns.
    selectedCategory!: string;
    selectedDate!: string;
    selectedStatus!: string;
    selectedSort!: string;

    // An array of objects representing the available options for the dropdowns.
    categories: { value: string, viewValue: string }[];
    dates: { value: string, viewValue: string }[];
    statuses: { value: string, viewValue: string }[];
    sorts: { value: string, viewValue: string }[];

    // An array of strings representing the column names for the mat-table.
    readonly COLUMN_NAMES: string[] = ['name', 'description', 'status', 'updatedAt'];

    @Input() filters?: Filter[];
    @Output() update: EventEmitter<Filter[]> = new EventEmitter<Filter[]>();

    constructor(private searchService: SearchService) {
        // Initialize dropdown options
        this.categories = [
            { value: 'category1', viewValue: 'カテゴリー1' },
            { value: 'category2', viewValue: 'カテゴリー2' },
            // ... other categories
        ];
        this.dates = [
            { value: 'today', viewValue: '今日' },
            { value: 'this_week', viewValue: '今週' },
            // ... other date options
        ];
        this.statuses = [
            { value: 'active', viewValue: 'アクティブ' },
            { value: 'archived', viewValue: 'アーカイブ' },
            // ... other status options
        ];
        this.sorts = [
            { value: 'name_asc', viewValue: '名前 昇順' },
            { value: 'name_desc', viewValue: '名前 降順' },
            // ... other sort options
        ];
    }

    ngOnInit(): void {
        // Set default values or retrieve from a service if needed
        this.selectedCategory = this.categories[0].value;
        this.selectedDate = this.dates[0].value;
        this.selectedStatus = this.statuses[0].value;
        this.selectedSort = this.sorts[0].value;
    }

    onUpdate(inDto: { type: string, value: string }): void {
        // Emit the updated filters when a selection is made
        if (!this.filters) this.filters = [];
        this.filters.push(new Filter(inDto.type as FilterType, inDto.value));
        this.update.emit(this.filters);
    }

    // Emit the updated filters when a selection is made
    onFilterChange(type: FilterType, value: string): void {
        const updatedFilters = this.filters?.map(filter => {
            if (filter.type === type) {
                return { ...filter, value };
            }
            return filter;
        });
        this.update.emit(updatedFilters);
    }

    // Emit the updated sort option when a selection is made
    onSortChange(value: string): void {
        // Assuming there is a sort filter type, otherwise, this would need to be handled differently
        this.onFilterChange(FilterType.STATUS, value);
    }
}
// 
// Please note that the above TypeScript code assumes that the HTML template is already set up to bind the `selectedCategory`, `selectedDate`, `selectedStatus`, and `selectedSort` variables with the corresponding `mat-select` elements and that the `onFilterChange` and `onSortChange` methods are called upon change of the dropdown values.
// 
// Also, the `FilterType` enum is used to identify the type of filter being changed, and the `update` event is emitted with the updated filters array. The `FilterType` enum should be defined in the `models.ts` file and should match the types used in the dropdowns.
// 
// The `COLUMN_NAMES` constant is used to represent the column names for a `mat-table` that might be present in the component's template. Adjust the column names as per the actual data structure of the projects or content being displayed.
// 
// The `categories`, `dates`, `statuses`, and `sorts` arrays are initialized with placeholder values and should be replaced with actual data from the application. The view values are provided in Japanese as per the requirement.