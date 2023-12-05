// src/app/pages/search-exploration.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project, Content, Filter } from '../../models/models';
import { SearchService } from '../../services';
import { AppCommonModule } from 'src/app/app-common.module';

@Component({
    selector: 'app-search-exploration',
    templateUrl: './search-exploration.component.html',
    styleUrls: ['./search-exploration.component.scss'],
    standalone: true,
    imports: [AppCommonModule],
})
export class SearchExplorationComponent implements OnInit {
    // An array of Project objects to hold the search results.
    projects: Project[] = [];

    // An array of Content objects to hold the suggested content.
    suggestedContent: Content[] = [];

    // A boolean flag to indicate whether an error occurred during the search process.
    error: boolean = false;

    // The current search query
    searchQuery: string = '';

    // The current filters applied to the search
    currentFilters: Filter[] = [];

    constructor(private searchService: SearchService) { }

    ngOnInit(): void {
        // Load initial suggested content based on user preferences or history
        this.loadSuggestedContent();
    }

    /**
     * A function to perform the search operation based on the given query string.
     */
    search(query: string): void {
        this.searchQuery = query;
        this.searchService.searchProjects(this.searchQuery, this.currentFilters)
            .subscribe(
                (projects: Project[]) => {
                    this.projects = projects;
                    this.error = false;
                },
                (error) => {
                    this.handleError(error);
                }
            );
    }

    /**
     * A function to filter the search results based on the selected filter value.
     */
    applyFilters(filters: Filter[]): void {
        this.currentFilters = filters;
        this.search(this.searchQuery);
    }

    /**
     * A function to handle errors that may occur during the search process.
     */
    handleError(error: any): void {
        console.error('An error occurred during the search process', error);
        this.error = true;
        this.projects = [];
    }

    /**
     * A function to load suggested content for the user.
     */
    private loadSuggestedContent(): void {
        // Assuming there's a method to get the current user's ID
        const userId = this.getCurrentUserId();
        this.searchService.getSuggestedContent(userId)
            .subscribe(
                (content: Content[]) => {
                    this.suggestedContent = content;
                },
                (error) => {
                    console.error('Error loading suggested content', error);
                }
            );
    }

    /**
     * A mock function to get the current user's ID.
     * In a real application, this would be replaced with an actual implementation.
     */
    private getCurrentUserId(): number {
        // TODO: Replace with actual user ID retrieval logic
        return 1; // Placeholder user ID
    }
}
// 
// Please note that the above TypeScript code assumes that there is a method to retrieve the current user's ID, which is used to load suggested content. In a real application, you would replace the `getCurrentUserId` method with actual logic to retrieve the user's ID, possibly from an authentication service or user context.
// 
// Additionally, the error handling is quite basic, logging the error to the console and setting an error flag. In a production environment, you would likely want to display a user-friendly message and potentially offer ways to recover from the error.
// 
// The `applyFilters` method is designed to update the current filters and then perform a new search with the updated filters. This allows the component to react to user input for filtering the search results.
// 
// The `search` method is responsible for calling the `searchProjects` method from the `SearchService` and updating the `projects` array with the results. It also sets the `error` flag accordingly based on whether the search was successful or not.
// 
// The `loadSuggestedContent` method is a private method that is called on initialization to load content suggestions for the user. It uses a placeholder user ID for demonstration purposes.