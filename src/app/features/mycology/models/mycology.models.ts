export interface MycologyState {
  pagination: {
    totalItems: number;
    page: number;
    changePage: boolean | null;
  };
  mushrooms: { [id: string]: Mushroom } | null;

  iconographicContainer: IconographicContainer | null;
  notifications: Notifications | null;
}

export type NotificationsType =
  | 'create'
  | 'update'
  | 'table is empty !'
  | 'no result !';

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
  epicute: string | null;
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

export type CreateMushroomRequest = Omit<Mushroom, 'id'>;

export type UpdateMushroomRequest = Mushroom & { id: string };

export interface Iconography {
  id?: number;
  imageURL: string;
  description: string;
}

export interface IconographicContainer {
  id?: string;
  formiconographyarray: Iconography[];
}
