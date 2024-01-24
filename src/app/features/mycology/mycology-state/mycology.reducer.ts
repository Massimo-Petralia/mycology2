import { createReducer, on } from '@ngrx/store';
import { initialState } from '../models/mycology.models';
import * as MycologyActions from '../mycology-state/mycology.actions';

export const mycologyReducer = createReducer(
  initialState,
  on(
    MycologyActions.loadMushroomsSucces,
    (mycologystate, { items, mushrooms }) => ({
      ...mycologystate,
      items: items,
      mushrooms: mushrooms,
    })
  ),
  on(MycologyActions.createMushroomSucces, (mycologystate, mushroom) => ({
    ...mycologystate,
    mushrooms: [...mycologystate.mushrooms, mushroom],
  })),
  on(
    MycologyActions.createIconographySucces,
    (mycologystate, iconographicContainer) => ({
      ...mycologystate,
      iconographicContainer,
    })
  ),
  on(MycologyActions.loadMushroomSucces, (mycologystate, mushroom) => ({
    ...mycologystate,
    mushroom: mushroom,
  })),
  on(
    MycologyActions.loadIconographySucces,
    (mycologystate, iconographicContainer) => ({
      ...mycologystate,
      iconographicContainer,
    })
  ),
  on(MycologyActions.deleteMushroomSucces, (mycologystate, { id }) => ({
    ...mycologystate,
    mushrooms: [
      ...mycologystate.mushrooms.filter((mushroom) => mushroom.id !== id),
    ],
  })),
  on(MycologyActions.updateMushroomSucces, (mycologystate, mushroom) => ({
    ...mycologystate,
    mushroom: mushroom,
  })),
  on(
    MycologyActions.updateIconographySucces,
    (mycologystate, iconographicContainer) => ({
      ...mycologystate,
      iconographicContainer: iconographicContainer,
    })
  )
);
