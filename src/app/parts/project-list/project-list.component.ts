// src/app/parts/project-list.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../../models/models';
import { ProjectService } from '../../services';
import { AppCommonModule } from 'src/app/app-common.module';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
    standalone: true,
    imports: [AppCommonModule],
})
export class ProjectListComponent implements OnInit {

    @Input() projects?: Project[];

    // Constants for mat-table column names
    // displayedColumns: string[] = ['thumbnail', 'name', 'description', 'edit', 'delete'];
    readonly COLUMN_NAMES: string[] = ['thumbnail', 'name', 'description', 'edit', 'delete'];

    // Output events
    @Output() select = new EventEmitter<{ id: number, name: string, description: string, thumbnail?: string }>();
    @Output() delete = new EventEmitter<number>();

    constructor(private projectService: ProjectService, public dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    onEdit(project: Project): void {
        // Emit an event to navigate to the ProjectCreationEditComponent for editing the project
        // This is a placeholder for the actual navigation logic which might involve using a router or emitting an event
        // this.edit.emit(project);
    }

    onDelete(project: Project): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '250px',
            data: { message: 'プロジェクトを削除してもよろしいですか？' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.projectService.deleteProject(project.id).subscribe(success => {
                    if (success) {
                        this.delete.emit(project.id);
                    } else {
                        // Handle the error case
                        // This is a placeholder for actual error handling logic
                        console.error('プロジェクトの削除に失敗しました。後でもう一度お試しください。');
                    }
                });
            }
        });
    }

    // Additional methods and logic as needed
}
// 
// Please note that the above TypeScript code assumes the existence of a `ConfirmationDialog` component which is not provided in the prompt. The `ConfirmationDialog` is used to confirm the deletion of a project. The actual implementation of the `ConfirmationDialog` and its data structure would need to be created to match this usage.
// 
// Also, the `onEdit` method is a placeholder for the actual navigation logic, which might involve using Angular's `Router` service or emitting an event to a parent component to handle the navigation. The specifics of this would depend on the broader application architecture and are not detailed in the prompt.