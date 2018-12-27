import * as Norman from "./src/normalize";
import { model } from "./src/model";
import { allPokemon } from "./src/__mockData__/pokemon";

let json = allPokemon;
// Norman.retrieve
// Norman.mapFrom
// Norman.child
// Norman.model
// Norman.isObject
// Norman.findWhere
// Norman.only

const getIds = json => json.map(pokemon => pokemon["name"]);

const normlizedPokemon = Norman.normalize(json, {
  total: [Norman.mapFrom, "count"],
  // pokemon: [Norman.mapFrom, "results"],
  names: [Norman.formatFrom, getIds, json["results"]]
});

const Pokemon = model(json, {
  total: [Norman.mapFrom, "count"],
  pokemon: [Norman.mapFrom, "results"],
  names: [Norman.formatFrom, getIds, json["results"]]
});

console.warn(Pokemon.all());
