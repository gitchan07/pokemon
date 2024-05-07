export interface Pokemon {
    id: number;
    species: Species;
    name: string;
    sprites: Sprites;
  }
  
  interface Sprites {
    front_default: string;
    back_default: string;
  }
  
  interface Species {
    url: string;
    name?: string;
  }
  
  export interface EvolutionChain {
    chain: Chain;
  }
  
  interface Chain {
    species: Species;
    evolves_to: Evolution[];
  }
  
  interface Evolution {
    species: Species;
  }
  
  export interface ResponseSpecies {
    evolution_chain: EvolutionChainSpecies;
  }
  
  interface EvolutionChainSpecies {
    url: string;
  }