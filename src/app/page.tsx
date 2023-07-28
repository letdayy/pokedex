"use client"

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styled from 'styled-components';
import Search from './components/Search';
import Card from './components/Card';


const Body = styled.body`
  background-color: #F0F8FF;
`

const Title = styled.h1`
  font-family: 'PokemonSolid', Arial, sans-serif;
  margin: 10px 30px;
`

const Cards = styled.div`
  display: flex;
  justify-content: center;
  
  flex-wrap: wrap;
`;

interface PokemonData {
  id: number;
  name: string;
  /* Outras propriedades que você deseja usar */
}

interface HomeProps {
  /* Defina as propriedades de Home conforme necessário */
}

const Home: React.FC<HomeProps> = (): JSX.Element => {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [filterPokemon, setFilterPokemon] = useState<string>('');

  const filteredPokemon = (nome: string) => {
    setFilterPokemon(nome)
  };

  const getAPIData = async () => {
    const endpoints: string[] = [];

    try {
      for (let i = 1; i <= 1000; i++) {
        endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
      }

      const responses = await Promise.all(endpoints.map((endpoint) => fetch(endpoint)));
      const pokemonsData = await Promise.all(responses.map(async (r) => await r.json()));

      setPokemons(pokemonsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAPIData();
  }, []);

  return (
    <Body>
      <Title>PokeAPI</Title>
      <Search filteredPokemon={filteredPokemon} />
      <Cards>
        {pokemons.filter((pokemon) => pokemon.name.includes(filterPokemon)).map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </Cards>
    </Body>
  );
};

export default Home;