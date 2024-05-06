import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file
import pokeLogo from './pokeLogo.png';
import pokeball from './pokeball.png';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      onSearch(searchTerm.toLowerCase());
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search Pokemon..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

function PokemonDetail({ pokemon }) {
  if (!pokemon) {
    return <div className="pokemon-detail">No Pokemon found with that name.</div>;
  }

  return (
    <div className="pokemon-detail">
      <br></br>
      <div className="details">
        <h2>{pokemon.name} N° {pokemon.id}</h2>
        <p>Description: {pokemon.description || 'No description available'}</p>
        <br></br>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <p>Base Experience: {pokemon.base_experience}</p>
        <p>Order: {pokemon.order}</p>
        <p>Is Default: {pokemon.is_default ? 'Yes' : 'No'}</p>
        <p>Species ID: {pokemon.pokemon_species_id}</p>

        <p>Evolution: {pokemon.evolution.name} (ID: {pokemon.evolution.id})</p>
        <p>Pokedex Number: {pokemon.pokedex_number}</p>
        <p>Habitat: {pokemon.habitat}</p>
      </div>
      <div className="stats">
        <br></br>
        <img src={pokeball} alt='' id='pokeball'></img>
        <br></br><br></br><br></br>
        <p>Types: {pokemon.types.join(', ')}</p>
        <br></br>
        <p>Stats:</p>
        <ul>
          <li>HP: {pokemon.stats.hp}</li>
          <li>Attack: {pokemon.stats.attack}</li>
          <li>Defense: {pokemon.stats.defense}</li>
          <li>Special Attack: {pokemon.stats['special-attack']}</li>
          <li>Special Defense: {pokemon.stats['special-defense']}</li>
          <li>Speed: {pokemon.stats.speed}</li>
        </ul>
      </div>
    </div>

  );
}

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  const fetchPokemon = async (name) => {
    try {
      const response = await fetch(`http://localhost:3001/api/pokemons/${name}`);
      if (!response.ok) {
        throw new Error('Pokemon not found');
      }
      const data = await response.json();
      setPokemon(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      setPokemon(null);
      setError(error.message);
    }
  };

  return (
    <div className="app">
      <img src={pokeLogo} alt='' id='logo-pokemon'></img>
      <h1>Pokédex</h1>
      <SearchBar onSearch={fetchPokemon} />
      {error && <div className="error">{error}</div>}
      {pokemon && <PokemonDetail pokemon={pokemon} />}
    </div>
  );
}

export default App;
