import { map } from "./map";
import { dive } from "./dive";
import { model } from "./model";

const Norman = (() => {
  return {
    map: map,
    model: model,
    dive: dive
  };
})();

export default Norman;
