import { createReducer, on } from "@ngrx/store";
import { initialState } from "../models/mycology.models";
import * as MycologyActions from '../mycology-state/mycology.actions'



export const mycologyReducer = createReducer(
    initialState,
    on(MycologyActions.loadMushroomsSucces, (mycologystate, {items, mushrooms})=> ({...mycologystate, items: items, mushrooms: mushrooms}))
)