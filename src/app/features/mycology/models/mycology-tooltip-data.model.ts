import { Mushroom } from './mycology.models';

export const tooltip: Mushroom = {
  taxonomy: {
    species: `The "Species" taxon of a mushroom is written with the first term (gender name)
    capitalized and the second term (species name) in lower case (for example "Amanita muscaria" ).`,
    AA: `Example:
    (J.E. Lange : Fries) Imbach (1946) =>
    - "J.E. Lange" is the original author who first published the species.
    - "Fries" is the author who sanctioned the species name.
    - "Imbach" is the author who combined the species into a new gender.
    - "(1946)" indicates the year the last combination was published.`,
    gender: `the "Gender" taxon in fungi represents a grouping of related species. 
    The gender is a taxonomic level higher than the species but lower than the family (for example "Pleurotus").`,
    family: `The taxon "Family" represents a broader grouping than the gender, 
    fungal families are used to group related genera (for example "Agaricaceae")`,
    order: `The "Order" taxon represents a taxonomic level higher than the family, 
    within a fungal order, families may differ greatly in their morphology and biology, 
    but share traits that make them closely related from an evolutionary point of view (e.g. Agaricales")`,
    commonName: `The common name of a mushroom is a non-scientific term to identify a species in a colloquial way, 
    it can vary greatly based on region and culture (for example "Boletus edulis": "Porcino" in Italy)`
  },
  morphology: {
    cap: '',
    gills: '',
    stalk: '',
    flesh: '',
  },
  features: {
    habitat: '',
    edibility: '',
    note: '',
  },
  microscopicFeatures: {
    spores: '',
    pileipellis: '',
    cystidia: '',
  },
};
