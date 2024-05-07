import React, { useState, useEffect } from "react";
import axios from "axios";

interface Pokemon {
  name: string;
  species: string;
  img: string;
  hp: string;
  attack: string;
  defense: string;
  type: string;
}

const SearchBar = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon>({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });
  const [isFavorite, setIsFavorite] = useState(false); 
  const [favoritePokemon, setFavoritePokemon] = useState<Pokemon[]>([]); 
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    const favoritePokemonData = JSON.parse(localStorage.getItem("favoritePokemon") || "[]") as Pokemon[];
    setFavoritePokemon(favoritePokemonData);
  
    const searchedPokemonData = JSON.parse(localStorage.getItem("searchedPokemon") || "{}") as Pokemon;
    if (searchedPokemonData.name) {
      setPokemon(searchedPokemonData);
      setPokemonChosen(true);
      const isPokemonInFavorites = favoritePokemon.some(p => p.name === searchedPokemonData.name);
      setIsFavorite(isPokemonInFavorites);
    }
  }, []); 
  

  const searchPokemon = async () => {
    setIsLoading(true); 
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      const pokemonData: Pokemon = {
        name: pokemonName,
        species: response.data.species.name,
        img: response.data.sprites.front_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        type: response.data.types[0].type.name,
      };
      setPokemonChosen(true);
      setPokemon(pokemonData);
      setIsFavorite(favoritePokemon.some(p => p.name === pokemonName)); // Update favorite status
      localStorage.setItem("searchedPokemon", JSON.stringify(pokemonData)); // Save searched Pokémon data
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      alert(`Pokemon with name "${pokemonName}" doesn't exist.`);
    } finally {
      setIsLoading(false); 
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchPokemon();
    }
  };

  const toggleFavorite = () => {
    const favoritePokemonUpdated = [...favoritePokemon];
    const isPokemonInFavorites = favoritePokemon.some(p => p.name === pokemon.name);

    if (!isPokemonInFavorites) {
      setIsFavorite(true);
      localStorage.setItem(
        "favoritePokemon",
        JSON.stringify([...favoritePokemonUpdated, pokemon])
      );
      setFavoritePokemon([...favoritePokemonUpdated, pokemon]);
    } else {
      setIsFavorite(false);
      const updatedFavorites = favoritePokemonUpdated.filter(p => p.name !== pokemon.name);
      localStorage.setItem("favoritePokemon", JSON.stringify(updatedFavorites));
      setFavoritePokemon(updatedFavorites);
    }
  };

  return (
    <>
      <div className="flex items-center mx-32 my-6">
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          onKeyPress={handleKeyPress}
          className="border border-gray-300 rounded-l-md py-2 px-4 block w-full focus:outline-none focus:border-teal-300"
          placeholder="Search..."
        />
        <button
          disabled={!pokemonName}
          onClick={searchPokemon}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md ${
            !pokemonName && "opacity-50 cursor-not-allowed"
          }`}
        >
          Search
        </button>
      </div>
      <div>
      {isLoading && (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
        {!pokemonChosen ? (
          <h1 className="text-3xl font-semibold">Please choose a Pokemon</h1>
        ) : (
          <>
            <h1 className="text-3xl mt-12 uppercase font-semibold">
              {pokemon.name}
            </h1>
            <img
              className="mx-auto block w-56"
              src={pokemon.img}
              alt={pokemon.name}
            />
            <div className="flex justify-center items-center">
              <div>
                <h3 className="bg-blue-600 text-white font-bold p-1 pl-3 rounded-lg w-48 mb-2 text-left text-sm capitalize">
                  Species: {pokemon.species}
                </h3>
                <h3 className="bg-blue-600 text-white font-bold p-1 pl-3 rounded-lg w-48 mb-2 text-left text-sm capitalize">
                  Type: {pokemon.type}
                </h3>
                <h4 className="bg-blue-600 text-white font-bold p-1 pl-3 rounded-lg w-48 mb-2 text-left text-sm">
                  Hp: {pokemon.hp}
                </h4>
                <h4 className="bg-blue-600 text-white font-bold p-1 pl-3 rounded-lg w-48 mb-2 text-left text-sm">
                  Attack: {pokemon.attack}
                </h4>
                <h4 className="bg-blue-600 text-white font-bold p-1 pl-3 rounded-lg w-48 mb-16 text-left text-sm">
                  Defense: {pokemon.defense}
                </h4>
                <button
                  onClick={toggleFavorite}
                  disabled={isFavorite}
                  className={`bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md mb-20 ${
                    isFavorite && "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {isFavorite ? "Already in Favorites" : "Add to Favorites"}
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </>
  );
};

export default SearchBar;