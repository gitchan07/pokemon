import { useCallback, useEffect, useState } from "react";
import FetchData from "../Utils/Fetch";
import { useNavigate } from "react-router-dom";

interface ResultPokemon {
  results: Pokemon[];
}

interface Pokemon {
  url: string;
  name: string;
}

const PokemonList = () => {
  const [data, setData] = useState<Pokemon[]>();

  const navigate = useNavigate();

  const fetchPokemons = useCallback(async () => {
    const response: ResultPokemon = await FetchData(
      "https://pokeapi.co/api/v2/pokemon"
    );
    setData(response.results);
  }, []);

  const getIdPokemon = (url: string) => {
    return url.split("/")[6];
  };

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  return (
    <>
      <h1>Pokemon Page </h1>
      <ul>
        {data &&
          data.map((item) => (
            <li>
              <b>Name:</b> {item.name}{" "}
              <button
                onClick={() => {
                  const id = getIdPokemon(item.url);
                  navigate(`/pokemon-detail/${id}`);
                }}
              >
                Detail
              </button>{" "}
              <br />
            </li>
          ))}
      </ul>
    </>
  );
};

export default PokemonList;