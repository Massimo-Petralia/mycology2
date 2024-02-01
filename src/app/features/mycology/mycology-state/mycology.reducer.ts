import { createReducer, on } from '@ngrx/store';
import { Mushroom, initialState } from '../models/mycology.models';
import * as MycologyActions from '../mycology-state/mycology.actions';

export const mycologyReducer = createReducer(
  initialState,
  on(
    MycologyActions.loadMushroomsSucces,
    (mycologystate, { items, mushrooms }) => ({
      ...mycologystate,
      items: items,
      mushrooms: mushrooms.reduce((collection: {[id: string]: Mushroom}, mushroom)=> {
        collection[mushroom.id!] = mushroom; return collection
      },{}),
    })
   ),
  on(MycologyActions.createMushroomSucces, (mycologystate, mushroom) => ({
    ...mycologystate,
    mushrooms: {...mycologystate.mushrooms, [mushroom.id as string]: mushroom}
  })),
  on(
    MycologyActions.createIconographySuccess,
    (mycologystate, iconographicContainer) => ({
      ...mycologystate,
      iconographicContainer,
    })
  ),
  on(MycologyActions.loadMushroomSucces, (mycologystate, mushroom) => ({
    ...mycologystate,
    mushrooms: {...mycologystate.mushrooms, [mushroom.id as string]: mushroom as Mushroom}

  })),
  on(
    MycologyActions.loadIconographySucces,
    (mycologystate, iconographicContainer) => ({
      ...mycologystate,
      iconographicContainer

    })
  ),
  on(MycologyActions.deleteMushroomSucces, (mycologystate, { id }) => {
    const updatedMushrooms = {...mycologystate.mushrooms};
    delete updatedMushrooms[id];
    return {...mycologystate, mushrooms: updatedMushrooms}
  }),

on(MycologyActions.updateMushroomSucces, (mycologystate, mushroom)=> ({
  ...mycologystate,
  mushrooms: {...mycologystate.mushrooms, [mushroom.id as string]: mushroom}
})),

on(MycologyActions.updateIconographySucces, (mycologystate, iconographicContainer)=> ({
  ...mycologystate,
  iconographicContainer: iconographicContainer
})),

  on(MycologyActions.resetState, (mycologystate)=> ({...mycologystate, iconographicContainer: null, mushrooms: null}))


);
