import * as Norman from "./src/normalize";
import { Model } from "./src/model";
import { allPokemon } from "./src/__mockData__/pokemon";

let json = allPokemon;

const getNames = json => json.map(pokemon => pokemon["name"]);

const Pokemon = Model(json, {
  total: [Norman.mapFrom, "count"],
  pokemon: [Norman.mapFrom, "results"],
  names: [Norman.formatFrom, getNames, json["results"]]
});

const AllPokemon = Model(json["results"], {
  name: [Norman.mapFrom, "name"],
  url: [Norman.mapFrom, "url"]
});

let pokemon = Pokemon.all();
let pokemons = AllPokemon.all();

console.log(pokemon);
console.log("______________");
console.log(pokemons);
