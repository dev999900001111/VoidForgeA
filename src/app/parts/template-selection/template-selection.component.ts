// src/app/parts/template-selection.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Template } from '../../models/models';
import { TemplateService } from '../../services';
import { AppCommonModule } from 'src/app/app-common.module';

@Component({
    selector: 'app-template-selection',
    templateUrl: './template-selection.component.html',
    styleUrls: ['./template-selection.component.scss'],
    standalone: true,
    imports: [AppCommonModule],
})
export class TemplateSelectionComponent implements OnInit {

    @Input() templates?: Template[]; // Array of templates to be displayed in the dropdown
    @Output() select = new EventEmitter<Template>(); // Event emitter for when a template is selected

    selectedTemplate?: Template; // Currently selected template

    constructor(private templateService: TemplateService) { }

    ngOnInit(): void {
        this.loadTemplates();
    }

    /**
     * Loads the templates using the TemplateService and sets the templates input.
     */
    private loadTemplates(): void {
        this.templateService.getTemplates().subscribe(
            (templates: Template[]) => {
                this.templates = templates;
            },
            (error) => {
                // Handle error scenario
                console.error('Failed to load templates', error);
            }
        );
    }

    /**
     * Handles the selection change event from the dropdown.
     * @param template The selected template object.
     */
    onSelectionChange(template: Template): void {
        this.selectedTemplate = template;
        this.select.emit(this.selectedTemplate);
    }
}
// 
// Please note that the above TypeScript code assumes that the `TemplateService` is correctly implemented and that the `getTemplates` method returns an `Observable<Template[]>`. The `Template` model is also assumed to be correctly defined in the `models.ts` file.
// 
// The `@Input()` decorator is used to bind the `templates` property to the input from the parent component, and the `@Output()` decorator is used to emit the selected template back to the parent component when a selection is made.
// 
// The `ngOnInit` lifecycle hook is used to load the templates when the component is initialized. The `loadTemplates` method subscribes to the `getTemplates` method from the `TemplateService` to retrieve the templates and handle any errors that may occur during the retrieval process.
// 
// The `onSelectionChange` method is called when the user selects a template from the dropdown. It updates the `selectedTemplate` property and emits the selected template using the `select` event emitter.
// 
// The `console.error` is used to log errors to the console. In a production environment, you would typically handle errors more gracefully, possibly by displaying a user-friendly message.