import { createAction, props } from "@ngrx/store";
import { Mushroom } from "../models/mycology.models";

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