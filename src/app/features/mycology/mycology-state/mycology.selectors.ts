import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MycologyState } from "../models/mycology.models";

export const selectFeature = createFeatureSelector<MycologyState>('mycology')

export const selectMushroomsFeature = createSelector(
    selectFeature,
    ({mushrooms})=> mushrooms
)

export const selectItemsFeature = createSelector(
    selectFeature,
    ({items})=> items
)

export const selectMushroomFeature = createSelector(
    selectFeature,
    ({mushroom}) => mushroom
)

export const selectIconographyFeature = createSelector(
    selectFeature,
    ({iconographicContainer}) => iconographicContainer
)