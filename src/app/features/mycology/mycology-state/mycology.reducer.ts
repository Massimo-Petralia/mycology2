import { createReducer, on } from '@ngrx/store';
import { Mushroom } from '../models/mycology.models';
import * as MycologyActions from '../mycology-state/mycology.actions';
import { MycologyState } from '../models/mycology.models';


export const initialState: MycologyState = {
  mushrooms: null,
  items: 0,
  iconographicContainer: null,
  notifications: {
    creation: {
      isCreated: false,
      notification: 'Created'
    },
    update: {
      isUpdate: false,
      notification: 'Updated'
    }
  }
};

export const mycologyReducer = createReducer(
  initialState,
  on(
    MycologyActions.loadMushroomsSucces,
    (mycologystate, { items, mushrooms }) => ({
      ...mycologystate,
      items: items,
      mushrooms: mushrooms.reduce(
        (collection: { [id: string]: Mushroom }, mushroom) => {
          collection[mushroom.id!] = mushroom;
          return collection;
        },
        {}
      ),
    })
  ),
  on(MycologyActions.createMushroomSucces, (mycologystate, mushroom) => ({
    ...mycologystate,
    mushrooms: {
      ...mycologystate.mushrooms,
      [mushroom.id as string]: mushroom,
    },
    notifications: {
      ...mycologystate.notifications,
      creation: { ...mycologystate.notifications.creation, isCreated: true },
      update: {...mycologystate.notifications.update, isUpdate: false}
    },
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
    mushrooms: {
      ...mycologystate.mushrooms,
      [mushroom.id as string]: mushroom as Mushroom,
    },
  })),
  on(
    MycologyActions.loadIconographySucces,
    (mycologystate, iconographicContainer) => ({
      ...mycologystate,
      iconographicContainer,
    })
  ),
  on(MycologyActions.deleteMushroomSucces, (mycologystate, { id }) => {
    const updatedMushrooms = { ...mycologystate.mushrooms };
    delete updatedMushrooms[id];
    return { ...mycologystate, mushrooms: updatedMushrooms };
  }),

  on(MycologyActions.updateMushroomSucces, (mycologystate, mushroom) => ({
    ...mycologystate,
    mushrooms: {
      ...mycologystate.mushrooms,
      [mushroom.id as string]: mushroom,
    },
    notifications: {
      ...mycologystate.notifications,
      update: { ...mycologystate.notifications.update, isUpdate: true },
      creation: {...mycologystate.notifications.creation, isCreated: false}
    },
  })),

  on(
    MycologyActions.updateIconographySucces,
    (mycologystate, iconographicContainer) => ({
      ...mycologystate,
      iconographicContainer: iconographicContainer,
    })
  ),

  on(MycologyActions.resetState, (mycologystate) => ({
    ...mycologystate,
    iconographicContainer: null,
    mushrooms: null,
  })),
  on(MycologyActions.resetNotificationsState, (mycologystate)=> ({
    ...mycologystate,
    notifications: {
      ...mycologystate.notifications,
      creation: {...mycologystate.notifications.creation, isCreated: false},
      update: {...mycologystate.notifications.update, isUpdate: false}
    }
  }))
);
