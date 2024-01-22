export interface MycologyState {
  mushrooms: Mushroom[];
  items: number;
  iconographicContainer?: IconographicContainer;
  mushroom?: Mushroom
}

export const initialState: MycologyState = {
  mushrooms: [],
  items: 0,
  iconographicContainer: undefined,
  mushroom: undefined
};

export interface Taxonomy {
  species: string | null;
  AA: string | null;
  gender: string | null;
  family: string | null;
  order: string | null;
  synonymous: string | null;
}

export interface Morphology {
  cap: string | null;
  gills: string | null;
  stalk: string | null;
  flesh: string | null;
}

export interface Features {
  habitat: string | null;
  edibility: string | null;
  note: string | null;
}

export interface MicroscopicFeatures {
  spores: string | null;
  pileipellis: string | null;
  cystidia: string | null;
}

export interface Mushroom {
  id?: string;
  taxonomy: Taxonomy;
  morphology: Morphology;
  features: Features;
  microscopicFeatures: MicroscopicFeatures;
  haveIconography?: boolean
}

export interface Iconography {
  id: number;
  imageURL: string;
  description: string;
}

export interface IconographicContainer {
  id?: string;
  mushroomID?: string;
  formiconographyarray: Iconography[];
}
