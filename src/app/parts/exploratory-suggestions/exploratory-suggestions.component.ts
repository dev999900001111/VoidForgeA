// src/app/parts/exploratory-suggestions.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Content } from '../../models/models';
import { SearchService } from '../../services';
import { AppCommonModule } from 'src/app/app-common.module';

@Component({
    selector: 'app-exploratory-suggestions',
    templateUrl: './exploratory-suggestions.component.html',
    styleUrls: ['./exploratory-suggestions.component.scss'],
    standalone: true,
    imports: [AppCommonModule],
})
export class ExploratorySuggestionsComponent implements OnInit {

    // An array that holds the suggestion objects to be displayed in the mat-grid-list.
    @Input() suggestions!: Content[];

    // EventEmitter for when a suggestion is selected.
    @Output() select: EventEmitter<Content> = new EventEmitter<Content>();

    // A flag indicating whether there is an error loading the suggestions.
    error: boolean = false;

    constructor(private searchService: SearchService) {
    }

    ngOnInit(): void {
        this.loadSuggestions();
    }

    /**
     * Loads suggestions using the SearchService.
     */
    private loadSuggestions(): void {
        // TODO: とりあえず、-1を渡しておく
        this.searchService.getSuggestedContent(-1).subscribe(
            (suggestions: Content[]) => {
                this.suggestions = suggestions;
            },
            (error) => {
                this.error = true;
                console.error('Error loading suggestions:', error);
            }
        );
    }

    /**
     * Emits the selected suggestion object when a grid tile is clicked.
     * @param suggestion The selected suggestion.
     */
    onTileClick(suggestion: Content): void {
        this.select.emit(suggestion);
    }

    /**
     * Returns an error message based on the current state.
     * @returns The appropriate error message.
     */
    getErrorMessage(): string {
        if (this.error) {
            return '提案を読み込む際に問題が発生しました。後でもう一度お試しください。';
        } else if (this.suggestions && this.suggestions.length === 0) {
            return '現時点で利用可能な提案はありません。後で新しいコンテンツをチェックしてください！';
        }
        return '';
    }
}
// 
// Please note that the error messages have been translated into Japanese as per the requirement. The `loadSuggestions` method is responsible for fetching the suggested content from the `SearchService`. The `onTileClick` method is used to emit the selected content when a user clicks on a suggestion tile. The `getErrorMessage` method provides a user-friendly message in case of an error or if there are no suggestions available.