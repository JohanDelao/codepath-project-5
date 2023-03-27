import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState({
    name: "Bulbasaur",
    types: ["grass", "poison"],
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
    hp: 45,
    attack: 49,
    defense: 49,
    height: 7,
    weight: 69,
  });

  async function fetchData() {
    for (let i = 1; i < 150; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      const response = await axios.get(url);
      let pokemonData = response.data;
      let types = pokemonData.types;
      let name = capitalizeFirstLetter(pokemonData.name);
      let newTypes = types.map((data) => {
        return data.type.name;
      });
      let pokemonObject = {
        name: name,
        types: newTypes,
        image: pokemonData.sprites.other.dream_world.front_default,
        height: pokemonData.height,
        weight: pokemonData.weight,
      };
      setPokemon((pokemons) => [...pokemons, pokemonObject]);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function consolePokemon() {
    console.log(pokemon);
  }

  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div className="App">
      <div className="upperSection">
        <div className="textSection">
          <h1 id="mainTitle">Gotta Catch 'Em All!</h1>
          <input
            id="searchBar"
            placeholder="Search"
            onChange={(inputString) => setPokemon(pokemon.forEach((pokemon) => {
              if(pokemon.includes(inputString)){
                return true;
              }else{
                return false;
              }
            }
            ))}
          ></input>
        </div>
      </div>
      <div className="lowerSection">
        <div className="selectedSection">
          <h3 className="title">Selected Pokemon</h3>
          <div className="upperBio">
            <h3 id="pokemonName">{selectedPokemon.name}</h3>
            <div className="typeOuterContainer">
              {selectedPokemon.types.map((type) => {
                return (
                  <div className="typeContainer" value={type}>
                    <p className="type" value={type}>
                      {type}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mainBio">
            <div className="bioImage">
              <img
                id="image"
                src={selectedPokemon.image}
                width={225}
                height={225}
              ></img>
            </div>
            <h3 className="baseStats">Base Stats</h3>
            <div className="innerMainBio">
              <div className="leftStats">
                <div className="hp">
                  <p className="header">HP</p>
                  <div
                    className="bar"
                    style={{
                      width: selectedPokemon.hp * 2,
                      background: "green",
                    }}
                  ></div>
                </div>
                <div className="attack">
                  <p className="header">Attack</p>
                  <div
                    className="bar"
                    style={{
                      width: selectedPokemon.attack * 2,
                      background: "red",
                    }}
                  ></div>
                </div>
                <div className="defense">
                  <p className="header">Defense</p>
                  <div
                    className="bar"
                    style={{
                      width: selectedPokemon.defense * 2,
                      background: "#FDD85D",
                    }}
                  ></div>
                </div>
              </div>
              <div className="bioBio">
                <div className="heightSection">
                  <p className="header">Height</p>
                  <p id="height">{selectedPokemon.height / 10} m</p>
                </div>
                <div className="weightSection">
                  <p className="header">Weight</p>
                  <p id="weight">{selectedPokemon.weight / 10} kg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pokemonContainer">
          {pokemon.map((pokemon) => {
            return (
              <div className="pokemon">
                <img src={pokemon.image} width={100} height={100}></img>
                <h3 className="pokemonName">{pokemon.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

// <div className='pokemonStats'>
//               <h3></h3>
//               <div className='leftStats'>
//                 <div className='hp'>
//                   <p>HP</p>
//                 </div>
//                 <div className='attack'>
//                   <p>Attack</p>
//                 </div>
//                 <div className='defense'>
//                   <p>Defense</p>
//                 </div>
//               </div>
//               <div className='rightStats'>
//                 <p className='height'>{pokemon.height}</p>
//                 <p className='weight'>{pokemon.weight}</p>
//                </div>
//               </div>
