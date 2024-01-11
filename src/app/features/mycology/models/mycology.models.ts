export interface Taxonomy {
    AA: string | null;
    species: string | null;
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
    id?: number;
    taxonomy: Taxonomy;
    morphology: Morphology;
    features: Features;
    microscopicFeatures: MicroscopicFeatures;
    haveIconography: boolean
  }
  

  export interface Iconography {
    id: number;
    imageURL: string;
    description: string
  }

  export interface IconographyMain {
    id?: number;
    mushroomID?: number;
    iconographyarray: Iconography[]
  }