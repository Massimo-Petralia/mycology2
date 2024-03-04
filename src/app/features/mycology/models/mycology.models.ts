export interface MycologyState {
  pagination?: {
    totlaItems: number,
    page: number
  }
  mushrooms: { [id: string]: Mushroom } | null;
  items: number;
  iconographicContainer: IconographicContainer | null;
  notifications: Notifications | null;
}

export type NotificationsType = 'create' | 'update'

export interface Notifications {
  type: NotificationsType;
  message: string;
}

export interface FormFilteredSearch {
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
  hymenophore: string | null;
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

export type CreateMushroomRequest =  Omit<Mushroom, 'id'>

export type UpdateMushroomRequest =  Mushroom & {id: string}



export interface Iconography {
  id?: number;
  imageURL: string;
  description: string;
}

export interface IconographicContainer {
  id?: string;
  formiconographyarray: Iconography[];
}
