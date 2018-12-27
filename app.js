import * as Norman from "./src/model";
import { allPokemon } from "./src/__mockData__/pokemon";

let json = allPokemon;
// Norman.retrieve
// Norman.mapFrom
// Norman.child
// Norman.model
// Norman.isObject
// Norman.findWhere
// Norman.only

const Pokemon = Norman.model(json, {
  total: [Norman.mapFrom, "count"],
  pokemon: [Norman.mapFrom, "results"]
});

console.warn(Pokemon);
