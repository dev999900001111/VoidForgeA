import { NgModule } from "@angular/core";

import { TranslatePipe } from "./pipes/translate.pipe";
import { UserNamePipe } from "./pipes/user-name.pipe";
import { PermissionLevelTranslationPipe } from "./pipes/permission-level-translation.pipe";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MarkdownModule } from 'ngx-markdown';

import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButtonModule } from "@angular/material/button";


@NgModule({
    // NgModule からコンポーネントをインポート
    imports: [
        MarkdownModule.forRoot(),

        MatIconModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatTabsModule,
        MatDialogModule,
        MatListModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatToolbarModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatButtonModule,

        FormsModule,
        CommonModule,
        RouterModule,

        TranslatePipe,
        PermissionLevelTranslationPipe,
        UserNamePipe,
    ],
    exports: [
        MatIconModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatTabsModule,
        MatDialogModule,
        MatListModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatToolbarModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatButtonModule,

        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,


        TranslatePipe,
        PermissionLevelTranslationPipe,
        UserNamePipe,
    ],
})
export class AppCommonModule { }
