import { mapFrom, formatFrom } from "./src/normalize";
import {
  Model,
  all,
  firstBy,
  sortBy,
  removeBy,
  findAllWhere
} from "./src/model";
import { allPokemon } from "./src/__mockData__/pokemon";

let json = allPokemon;

const getNames = json => json.map(pokemon => pokemon["name"]);

const Pokemon = Model(json, {
  total: [mapFrom, "count"],
  pokemon: [mapFrom, "results"],
  names: [formatFrom, getNames, json["results"]]
});

const AllPokemon = Model(json["results"], {
  name: [mapFrom, "name"],
  url: [mapFrom, "url"]
});

let pokemons = AllPokemon(all);
let zubat = AllPokemon(firstBy, "name", "zubat");
let sortedPokes = AllPokemon(sortBy, "name");
let noBulba = AllPokemon(removeBy, "name", "bulbasaur");
let pokemonWithLetterA = AllPokemon(findAllWhere, entries =>
  entries.filter(entry => entry.name[0] === "a")
);

console.warn(pokemonWithLetterA);
