import { mapFrom, formatFrom } from "./src/normalize";
import { Model, all, firstBy, sortBy, removeBy } from "./src/model";
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
let nameBeginsWithLetterA = AllPokemon(findAllWhere, entries => {
  entries.filter(entry => entry.name[0] === "a");
});
let sortedPokes = AllPokemon(sortBy, "name");
let noBulba = AllPokemon(removeBy, "name", "bulbasaur");

console.warn(zubat);
console.warn(sortedPokes[0], sortedPokes[1], sortedPokes[2]);
console.warn(pokemons[0]);
console.warn(noBulba[0]);
console.warn(nameBeginsWithLetterA);
