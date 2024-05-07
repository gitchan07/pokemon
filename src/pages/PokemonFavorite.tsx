import React, { useState, useEffect } from "react";

interface PokemonData {
  name: string;
  img: string;
}

const capitalizeFirstLetter = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

const PokemonFavorite: React.FC = () => {
  const [favoritePokemon, setFavoritePokemon] = useState<PokemonData[]>([]);

  useEffect(() => {
    const favoritePokemonData: PokemonData[] = JSON.parse(localStorage.getItem("favoritePokemon") || "[]");
    setFavoritePokemon(favoritePokemonData);
  }, []);

  const removePokemon = (index: number) => {
    const updatedFavorites = [...favoritePokemon];
    updatedFavorites.splice(index, 1);
    setFavoritePokemon(updatedFavorites);
    localStorage.setItem("favoritePokemon", JSON.stringify(updatedFavorites));
  };

  return (
    <ul className="flex flex-col items-center ">
      {favoritePokemon.map((pokemon: PokemonData, index: number) => (
        <li key={index} className="flex items-center mb-4 ">
          <img src={pokemon.img} alt={pokemon.name} className="w-16 h-16" />
          <span className="ml-2">{capitalizeFirstLetter(pokemon.name)}</span>
          <button onClick={() => removePokemon(index)} className="ml-2 bg-red-500 text-white font-bold py-2 px-4 rounded-xl hover:bg-red-700 duration-300">
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

const PokeFav: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className=" p-4 rounded-md">
        <h1 className="text-3xl font-bold mt-8 mb-12 text-center">Favorite Pokemon</h1>
        <div className="bg-emerald-200 py-8 px-12 rounded-xl shadow-lg mb-14">

        <PokemonFavorite />
        </div>
      </div>
    </div>
  );
};

export default PokeFav;