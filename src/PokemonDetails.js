import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assurez-vous d'importer Axios ici

const PokemonDetails = ({ name }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/pokemons/${name}`);
        setPokemon(response.data);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
    };

    fetchPokemon();
  }, [name]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <p>ID: {pokemon.id}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Types: {pokemon.types.join(', ')}</p>
      {/* Afficher d'autres informations selon les besoins */}
    </div>
  );
};

export default PokemonDetails;
