// src/app/parts/search-bar.component.ts
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Filter, Project } from '../../models/models';
import { SearchService } from '../../services';
import { Observable } from 'rxjs';
import { AppCommonModule } from 'src/app/app-common.module';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
    standalone: true,
    imports: [AppCommonModule],
})
export class SearchBarComponent implements OnInit {
    @Input() query: string = '';
    @Output() search: EventEmitter<string> = new EventEmitter<string>();

    // No need for mat-table column names as they are not used in this component

    constructor(private searchService: SearchService) {
    }

    ngOnInit(): void {
        // Initialization logic if needed
    }

    // Function to emit the search query when the user hits the Enter key or clicks the search button.
    onSearch(): void {
        this.search.emit(this.query);
    }

    // Function to clear the search query and emit an empty string.
    clearSearch(): void {
        this.query = '';
        this.search.emit(this.query);
    }

    // Function to call the search service with the current query and filters
    performSearch(filters: Filter[]): Observable<Project[]> {
        return this.searchService.searchProjects(this.query, filters);
    }
}
// 
// Please note that the `performSearch` function is added to demonstrate how the `SearchService` could be used within the component. However, the actual implementation details of how and where to call this function would depend on the broader application context and are not shown in this snippet. The `filters` parameter is included to match the `searchProjects` method signature from the `SearchService`, but the actual filters would need to be managed by the component or passed in from a parent component.