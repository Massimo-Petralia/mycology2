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
    The gender is a taxonomic level higher than the species but lower than the family (for example "Pleurotus")`,
    family: `The taxon "Family" represents a broader grouping than the gender, 
    fungal families are used to group related genera (for example "Agaricaceae")`,
    order: `The "Order" taxon represents a taxonomic level higher than the family, 
    within a fungal order, families may differ greatly in their morphology and biology, 
    but share traits that make them closely related from an evolutionary point of view (e.g. Agaricales")`,
    commonName: `The common name of a mushroom is a non-scientific term to identify a species in a colloquial way, 
    it can vary greatly based on region and culture (for example "Boletus edulis": "Porcino" in Italy)`,
  },
  morphology: {
    cap: `Description of : Size, Shape, Color, Surface, Margin, Sliminess, Smell etc... 
    these are just some of the main macroscopic characteristics that can be observed on the cap of a mushroom`,
    hymenophore: `The hymenophore hosts the elements for the reproduction of the mushroom, 
    in Basidiomycete mushrooms it is made up of lamellae (they can be: Free, Decurrent, Adnate etc...) 
    in Ascomycete mushrooms it is made up of aschi`,
    stalk: `Description of : Size, Shape, Color, Surface, Ring, Base, Consistency 
    These are just some of the main macroscopic features that can be observed on the stalk of a mushroom.`,
    flesh: `The consistency, chromatic and organoleptic characteristics of the flesh are mainly evaluated: consistency, 
    color and color change, odour, Taste (for example: ...very meaty, ...white in
    cap,...earthy smell,...flour flavour)`,
  },
  features: {
    habitat: `Elements that constitute the collection habitat, in practice the ecological conditions that
    characterize the environment or growth station of the fungus (for example if they are lignicolous or if they grow on humus)`,
    edibility: `Mushrooms are a food to be treated with great caution, and they can be truly dangerous, causing serious poisoning or death. 
    The only criterion to be adopted to evaluate the edibility of a mushroom is the certain identification of the species. But this is often far from easy.`,
    note: `information that can be useful for identifying the species and distinguishing it from others that may have similar characteristics`,
  },
  microscopicFeatures: {
    spores: `The first characteristics to be observed in the spores are the shape, colour, size, 
    conformation of the wall if smooth or affected by ornamentation and the possible presence of a germinative pore. 
    Other characters, no less important for the study of certain genera, are: possible presence of a hilar plaque in the warty spores, 
    detachment of the perisporium, color change of the wall if treated with specific chemical reagents, etc.`,
    epicute: `The epicutis is an outer layer of tissue in fungi that can be composed of cells of different types. 
    It has a protective function and can be involved in the diffusion of pigments (for example: Cutis, Trichoderm, Hymeniderm, Epithelium).`,
    cystidia: `Cystidia are found on the lamellae: they are sterile terminal cells (hyphae). 
    Cystidia can be of very variable shape and size (for example: cylindrical cystidia, fusiform cystidia).`,
  },
};
