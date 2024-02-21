export interface MycologyState {
  mushrooms: { [id: string]: Mushroom } | null;
  items: number;
  iconographicContainer: IconographicContainer | null;
  notifications: Notifications;
}

export interface Notifications {
  creation: {
    isCreated: boolean;
    notification: string;
  };
  update: {
    isUpdate: boolean;
    notification: string;
  };
}

export interface FormSearch {
  filter: string | null;
  search: string | null;
}

export interface Taxonomy {
  species: string | null;
  AA: string | null;
  gender: string | null;
  family: string | null;
  order: string | null;
  commonName: string | null;
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
  iconographyID?: string | null;
}

export interface Iconography {
  id?: number;
  imageURL: string;
  description: string;
}

export interface IconographicContainer {
  id?: string;
  formiconographyarray: Iconography[];
}
