import { dive } from "./dive";
import { model } from "./model";

const Norman = (() => {
  return {
    model: model,
    dive: dive
  };
})();

export default Norman;
