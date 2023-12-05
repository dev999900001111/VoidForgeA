import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimations } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

import { routes } from './app.routes';
import { ApiInterceptor } from './api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    provideRouter(routes),
    importProvidersFrom(
      // BrowserAnimationsModule,
      // FormsModule,
      // HttpClientModule,
      // CommonModule,
      // RouterModule,
      // AppCommonModule,
    ),
  ],
};
