import { createAction, props } from '@ngrx/store';
import { IconographicContainer, Mushroom } from '../models/mycology.models';

export const loadMushroomsRequest = createAction(
  '[Mushroom Table Page] Load Paginated Mushroom Table Request',
  props<{ pageIndex: number, filter: string, search: string }>()
);

export const loadMushroomsSucces = createAction(
  '[Mushrooms API] Load Paginated Mushroom Table Succes',
  props<{ items: number; mushrooms: Mushroom[] }>()
);

export const loadMushroomsFailed = createAction(
  '[Mushrooms API] Load Paginated Mushroom Table Failed'
);

export const createMushroomRequest = createAction(
  '[Form Mushroom Page] Create Mushroom Request',
  props<Mushroom>()
);

export const createMushroomSucces = createAction(
  '[Mushroom API] Create Mushroom Succes',
  props<Mushroom>()
);

export const createMushroomFailed = createAction(
  '[Mushroom API] Create Mushroom Failed'
);

export const createIconographyRequest = createAction(
  '[Create Mushroom Effects] Create Iconography Request',
  props<{ iconographicContainer: IconographicContainer; mushroom: Mushroom }>()
);

export const createIconographySuccess = createAction(
  '[Iconography API] Create Iconography Succes',
  props<IconographicContainer>()
);

export const createIconographyFailed = createAction(
  '[Iconography API] Create Iconography Failed'
);
export const loadMushroomRequest = createAction(
  '[Form Mushroom Page] Load Mushroom Request',
  props<{ id: string }>()
);

export const loadMushroomSucces = createAction(
  '[Mushroom API] Load Mushroom Succes',
  props<Mushroom>()
);

export const loadMushroomFailed = createAction(
  '[Mushroom API] Load Mushroom Failed'
);

export const loadIconographyRequest = createAction(
  '[Load Mushroom Effects] Load Iconography Request',
  props<{ id: string }>()
);

export const loadIconographySucces = createAction(
  '[Iconography API] Load Iconography Succes',
  props<IconographicContainer>()
);

export const loadIconographyFailed = createAction(
  '[Iconography API] Load Iconography Failed'
);

export const deleteMushroomRequest = createAction(
  '[Form Mushroom] Delete Mushroom Request',
  props<{ mushroom: Mushroom }>()
);

export const deleteMushroomSucces = createAction(
  '[Mushroom API] Delete Mushroom Succes',
  props<{ id: string }>()
);

export const deleteMushroomFailed = createAction(
  '[Mushroom API] Delete Mushroom failed'
);

export const deleteIconographyRequest = createAction(
  '[Delete Mushroom Effects] Delete Iconography Request',
  props<{ iconographicContainerID: string }>()
);

export const deleteIconographySucces = createAction(
  '[Iconography API] Delete Iconography Succes',
  //props<{ iconographicContainerID: string }>()
);

export const deleteIconographyFailed = createAction(
  '[Iconography API] Delete Iconography Failed'
);

export const updateMushroomRequest = createAction(
  '[Form Mushroom Page] Update Mushroom Request',
  props<Mushroom>()
);

export const updateMushroomSucces = createAction(
  '[Mushroom API] Update Mushroom Succes',
  props<Mushroom>()
);

export const updateMushroomFailed = createAction(
  '[Mushroom API] Update Mushroom Failed'
);

export const updateIconographyRequest = createAction(
  '[Update Mushroom Effect] Update Iconography Request',
  props<{ mushroom: Mushroom; iconographicContainer: IconographicContainer }>()
);

export const updateIconographySucces = createAction(
  '[Iconography API] Update Iconography Succes',
  props<IconographicContainer>()
);

export const updateIconographyFailed = createAction(
  '[Iconography API] Update Iconography Failed'
);

//-----------------------------------------------------------------------------------------------------------------------------------------------------

export const saveMycologyRequest = createAction(
  '[Mycology Page] Save Mycology Data Request',
  props<{ mushroom: Mushroom; iconographicContainer: IconographicContainer }>()
);

export const saveMycologyFailed = createAction(
  '[Mycology API] Save Mycology Data Failed'
);

export const resetState = createAction('[Mycology Page] Reset State');

export const resetNotificationsState = createAction('[Mycology Page] Reset Notifications State')
