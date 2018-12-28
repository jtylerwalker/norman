import * as N from "./src/normalize";
import { allPokemon } from "./src/__mockData__/pokemon";
import { ditto as json } from "./src/__mockData__/themarbles";

const GameIndices = N.model({}, json["game_indices"]);

const Ditto = N.model(
  {
    id: "id",
    experience: "base_experience",
    height: "height"
  },
  json
);

const ditto = Ditto(N.all);

console.warn(ditto);
