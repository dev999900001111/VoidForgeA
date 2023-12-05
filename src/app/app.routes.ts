import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'top-menu', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
    { path: 'top-menu', loadComponent: () => import('./pages/top-menu/top-menu.component').then(m => m.TopMenuComponent) },
    { path: 'collaboration', loadComponent: () => import('./pages/collaboration/collaboration.component').then(m => m.CollaborationComponent) },
    { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
    { path: 'help-support', loadComponent   : () => import('./pages/help-support/help-support.component').then(m => m.HelpSupportComponent) },
    {
        path: 'project-creation-edit', loadComponent: () => import('./pages/project-creation-edit/project-creation-edit.component').then(m => m.ProjectCreationEditComponent),
        children: [
            { path: 'step01-requirements/:id', loadComponent: () => import('./pages/project-creation-edit/step01-requirements/step01-requirements.component').then(m => m.Step01RequirementsComponent) },
            { path: 'step02-feature/:id', loadComponent: () => import('./pages/project-creation-edit/step02-feature/step02-feature.component').then(m => m.Step02FeatureComponent) },
            { path: 'step03-feature-detail/:id', loadComponent: () => import('./pages/project-creation-edit/step03-feature-detail/step03-feature-detail.component').then(m => m.Step03FeatureDetailComponent) },
        ]
    },
    { path: 'search-exploration', loadComponent: () => import('./pages/search-exploration/search-exploration.component').then(m => m.SearchExplorationComponent) },
    { path: 'user-settings-profile', loadComponent: () => import('./pages/user-settings-profile/user-settings-profile.component').then(m => m.UserSettingsProfileComponent) }, ,
    { path: '**', redirectTo: 'login' } // 未定義のルートの場合はログインページにリダイレクトする
] as Routes;
