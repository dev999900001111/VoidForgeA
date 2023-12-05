// src/app/parts/content-editor.component.ts
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { ContentService } from '../../services';
import { MatCard } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { AppCommonModule } from 'src/app/app-common.module';

@Component({
    selector: 'app-content-editor',
    templateUrl: './content-editor.component.html',
    styleUrls: ['./content-editor.component.scss'],
    standalone: true,
    imports: [AppCommonModule],
})
export class ContentEditorComponent implements OnInit {

    // This variable holds the text content that is being edited in the textarea.
    @Input() content: string = '';

    // This is an event emitter that emits events when the content in the textarea changes.
    @Output() change: EventEmitter<string> = new EventEmitter<string>();

    // This is an event emitter that emits events when the content is saved.
    @Output() save: EventEmitter<string> = new EventEmitter<string>();

    // A reference to the textarea element for direct DOM access, often used for focusing or reading values that aren't easily accessible through data binding.
    @ViewChild('textArea') textArea!: ElementRef;

    constructor(private contentService: ContentService) {
    }

    ngOnInit(): void {
        // If there's a need to initialize the content from a service when the component is created
        // this.contentService.getContent(projectId).subscribe(content => this.content = content);
    }

    /**
     * This function applies the specified formatting action (e.g., bold, italic) to the selected text in the content editor.
     * @param action The formatting action to apply.
     */
    format(action: string): void {
        // Implementation would depend on the actual rich text editor being used.
        // This is a placeholder for the logic to apply formatting.
        console.log(`Formatting action: ${action}`);
    }

    /**
     * This function inserts a new element (e.g., list, image, video) into the content at the current cursor position or selection.
     * @param type The type of element to insert.
     */
    insert(type: string): void {
        // Implementation would depend on the actual rich text editor being used.
        // This is a placeholder for the logic to insert elements.
        console.log(`Inserting element of type: ${type}`);
    }

    /**
     * This function saves the current content, possibly by sending it to a backend service or by triggering another component action.
     */
    saveContent(): void {
        // Here we would call the contentService to save the content
        // For example:
        // this.contentService.updateContent(projectId, this.content).subscribe(success => {
        //     if (success) {
        //         this.save.emit(this.content);
        //     } else {
        //         // Handle error
        //     }
        // });

        // Emitting save event for now
        this.save.emit(this.content);
    }

    /**
     * This function is called when the content in the textarea changes.
     * It emits the change event with the updated content.
     */
    onContentChange(): void {
        this.change.emit(this.content);
    }
}