import { createAction, props } from "@ngrx/store";
import { IconographicContainer, Mushroom } from "../models/mycology.models";

export const loadMushroomsRequest = createAction(
    '[Mushroom Table Page] Load Paginated Mushroom Table Request',
    props<{pageIndex: number}>()
)

export const loadMushroomsSucces = createAction(
    '[Mushrooms API] Load Paginated Mushroom Table Succes',
    props<{items: number, mushrooms: Mushroom[]}>()
)

export const loadMushroomsFailed = createAction(
    '[Mushrooms API] Load Paginated Mushroom Table Failed'
)
export const createMushroomRequest = createAction(
    '[Form Mushroom Page] Create Mushroom Request',
    props<{mushroom: Mushroom, iconographicContainer: IconographicContainer}>()
)

export const createMushroomSucces = createAction(
    '[Mushroom API] Create Mushroom Succes',
    props<Mushroom>()
)

export const createMushroomFailed = createAction(
    '[Mushroom API] Create Mushroom Failed'
)

export const createIconographyRequest = createAction(
    '[Form Iconography Page] Create Iconography Request',
    props<IconographicContainer>()
)

export const createIconographySucces = createAction(
    '[Iconography API] Create Iconography Succes',
    props<IconographicContainer>()
)

export const createIconographyFailed = createAction(
    '[Iconography API] Create Iconography Failed'
)

export const loadMushroomRequest = createAction(
    '[Form Mushroom Page] Load Mushroom Request',
    props<{id: number}>()
)

export const loadMushroomSucces = createAction(
    '[Mushroom API] Load Mushroom Succes',
    props<Mushroom>()
)

export const loadMushroomFailed = createAction(
    '[Mushroom API] Load Mushroom Failed'
)