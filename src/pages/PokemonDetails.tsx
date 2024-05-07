import { useParams } from "react-router-dom";
import { EvolutionChain, Pokemon, ResponseSpecies } from "../types/Pokemon";
import { useCallback, useEffect, useState } from "react";
import FetchData from "../Utils/Fetch";

const PokemonDetail = () => {
  const param = useParams();

  const [data, setData] = useState<Pokemon>();
  const [evolution, setEvolution] = useState<EvolutionChain>();

  const fetchPokemons = useCallback(async () => {
    const response: Pokemon = await FetchData(
      `https://pokeapi.co/api/v2/pokemon/${param.id}`
    );
    setData(response);
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const changeEvolution = async () => {
    const urlSpecies: string = data?.species.url ?? "";
    const response: ResponseSpecies = await FetchData(urlSpecies);

    const responseEvolution: EvolutionChain = await FetchData(
      response.evolution_chain.url
    );
    setEvolution(responseEvolution);
  };

  return (
    <div>
      <h1>Pokemon {data?.name}</h1>
      <h3>Species: {data?.species.name}</h3>
      <img src={data?.sprites.front_default} alt="" />
      <br />
      <img src={data?.sprites.back_default} alt="" />
      <br />
      <button
        onClick={() => {
          changeEvolution();
        }}
      >
        Klik Evolution
      </button>
      {evolution && (
        <h3>
          {data?.species.name} evolution to{" "}
          <i>{evolution?.chain.evolves_to[0].species.name}</i>
        </h3>
      )}
    </div>
  );
};

export default PokemonDetail;