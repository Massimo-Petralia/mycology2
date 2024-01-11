import { createReducer, on } from "@ngrx/store";
import { initialState } from "../models/mycology.models";


export const mycologyReducer = createReducer(
    initialState
)