import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MycologyState } from '../models/mycology.models';

const getMushrooms = (state: MycologyState) => state.mushrooms;

const getIconography = (state: MycologyState) => state.iconographicContainer;

export const selectFeature = createFeatureSelector<MycologyState>('mycology');

export const selectMushroomsFeature = createSelector(
  selectFeature,
  getMushrooms
);

export const selectItemsFeature = createSelector(
  selectFeature,
  ({ items }) => items
);

export const selectIconographyFeature = createSelector(
  selectFeature,
  getIconography
);
