import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { withComponentInputBinding } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore, provideState } from '@ngrx/store';
import { mycologyReducer } from './features/mycology/mycology-state/mycology.reducer';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { provideAnimations } from '@angular/platform-browser/animations';

import { provideHttpClient, withFetch } from '@angular/common/http';

import {
  LoadMushroomsEffects,
  CreateMushroomEffects,
  CreateIconographyEffects,
  LoadMushroomEffects,
  LoadIconographyEffects,
  DeleteMushroomEffects,
  DeleteIconographyEffects,
  UpdateMushroomEffects,
  UpdateIconographyEffects,
  SaveMycologyDataEffects,
} from '../app/features/mycology/mycology-state/mycology.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStore(),
    provideState('mycology', mycologyReducer),
    provideEffects(
      LoadMushroomsEffects,
      CreateMushroomEffects,
      CreateIconographyEffects,
      LoadMushroomEffects,
      LoadIconographyEffects,
      DeleteMushroomEffects,
      DeleteIconographyEffects,
      UpdateMushroomEffects,
      UpdateIconographyEffects,
      SaveMycologyDataEffects
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimations(),
  ],
};
