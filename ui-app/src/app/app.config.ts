import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigFactory,
      multi: true,
      deps: [AppConfigService],
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(), 
    provideRouter(routes),
  ],
};
