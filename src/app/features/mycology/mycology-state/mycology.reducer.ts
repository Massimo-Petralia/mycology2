import { createReducer, on } from '@ngrx/store';
import { Mushroom, NotificationsType } from '../models/mycology.models';
import * as MycologyActions from '../mycology-state/mycology.actions';
import { MycologyState } from '../models/mycology.models';

export const initialState: MycologyState = {
  mushrooms: null,
  pagination: {totalItems: 0, page: 1},
  iconographicContainer: null,
  notifications: null
};

export const mycologyReducer = createReducer(
  initialState,
  on(
    MycologyActions.loadMushroomsSucces,
    (mycologystate, { items, mushrooms }) => ({
      ...mycologystate,
      pagination: {...mycologystate.pagination, totalItems: items},
      mushrooms: mushrooms.reduce(
        (collection: { [id: string]: Mushroom }, mushroom) => {
          collection[mushroom.id!] = mushroom;
          return collection;
        },
        {}
      ),
    })
  ),
  on(MycologyActions.createMushroomSucces, (mycologystate, mushroom) => {
    const type: NotificationsType = 'create'
    const mycologyStateItems = mycologystate.pagination.totalItems + 1;
    return {
      ...mycologystate,
      mushrooms: {
        ...mycologystate.mushrooms,
        [mushroom.id as string]: mushroom,
      },
      notifications: {
        type,
        message: 'created'
      },
      items: mycologyStateItems,
    };
  }),
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
  on(
    MycologyActions.deleteMushroomsSucces,
    (mycologystate, { deletedMushroomsNumber }) => {
      const mycologyStateItems = mycologystate.pagination.totalItems - deletedMushroomsNumber;
      return {
        ...mycologystate,
        pagination: {...mycologystate.pagination, totalItems: mycologyStateItems},
      };
    }
  ),

  on(MycologyActions.updateMushroomSucces, (mycologystate, mushroom) => {
    const type: NotificationsType = 'update'
    return {
      ...mycologystate,
      mushrooms: {
        ...mycologystate.mushrooms,
        [mushroom.id as string]: mushroom,
      },
      notifications: {
        type,
        message: 'updated'
      },
    }
  }),

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
  on(MycologyActions.resetNotificationsState, (mycologystate) => ({
    ...mycologystate,
    notifications: null
  })),
  on(MycologyActions.updatePageIndexSuccess, (mycologystate, {pageIndex})=> ({...mycologystate, pagination: {...mycologystate.pagination, page: pageIndex}}))
);
