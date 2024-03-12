import { createAction, props } from '@ngrx/store';
import { IconographicContainer, Mushroom } from '../models/mycology.models';

export const loadMushroomsRequest = createAction(
  '[Mushrooms Table Page] Load Paginated Mushrooms Table Request',
  props<{ pageIndex: number; filter: string | null; search: string | null }>()
);

export const loadMushroomsSucces = createAction(
  '[Mushrooms API] Load Paginated Mushrooms Table Succes',
  props<{ items: number; mushrooms: Mushroom[] }>()
);

export const loadMushroomsFailed = createAction(
  '[Mushrooms API] Load Paginated Mushrooms Table Failed'
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

export const deleteMushroomsRequest = createAction(
  '[Form Mushroom] Delete Mushrooms Request',
  props<{ mushrooms: Mushroom[]; changePage?: boolean }>()
  //metti una proprietà opzionale changePage boolean | null
);

export const deleteMushroomsSucces = createAction(
  '[Mushroom API] Delete Mushrooms Success',
  props<{ deletedMushroomsNumber: number }>()
);

export const deleteMushroomsFailed = createAction(
  '[Mushroom API] Delete Mushrooms failed'
);

export const deleteIconographiesRequest = createAction(
  '[Delete Mushroom Effects] Delete Iconographies Request',
  props<{ mushroomsIconographyID: string[] }>()
);

export const deleteIconographiesSucces = createAction(
  '[Iconography API] Delete Iconographies Succes'
);

export const deleteIconographiesFailed = createAction(
  '[Iconography API] Delete Iconographies Failed'
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

export const resetState = createAction('[Mycology Page] Reset State');

export const resetNotificationsState = createAction(
  '[Mycology Page] Reset Notifications State'
);

export const saveMycologyRequest = createAction(
  '[Mycology Page] Save Mycology Data Request',
  props<{ mushroom: Mushroom; iconographicContainer: IconographicContainer }>()
);

export const saveMycologyFailed = createAction(
  '[Mycology API] Save Mycology Data Failed'
);

export const createMycologyRequest = createAction(
  '[Mycology Page] Create Mycology Request',
  props<{ mushroom: Mushroom; iconographicContainer: IconographicContainer }>()
);

export const createMycologyFailed = createAction(
  '[Mycology Effects] Create Mycology Failed'
);

export const updateMycologyRequest = createAction(
  '[Mycology Page] Update Mycology Request',
  props<{ mushroom: Mushroom; iconographicContainer: IconographicContainer }>()
);

export const updateMycologyFailed = createAction(
  '[Mycology Effects] Update Mycology Failed'
);

export const updatePageIndexRequest = createAction(
  '[Mushrooms Page] Update Page Index Request',
  props<{ pageIndex: number }>()
);

export const updatePageIndexSuccess = createAction(
  '[Mycology Effects]  Update Page Index success',
  props<{ pageIndex: number }>()
);

export const changePageRequest = createAction(
  '[Mycology Effects] Change Page Request',
  props<{ changePage: boolean | null }>()
);

export const changePageFailed = createAction(
  '[Mycology Effects] Change Page Failed'
);
