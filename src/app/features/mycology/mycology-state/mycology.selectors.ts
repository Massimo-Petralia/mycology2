import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MycologyState } from "../models/mycology.models";

export const selectFeature = createFeatureSelector<MycologyState>('mycology')

export const selectMushroomsFeature = createSelector(
    selectFeature,
    ({mushrooms})=> mushrooms
)