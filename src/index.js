import { dive } from "./dive";
import { model } from "./model";

const Norman = (() => ({
  model: model,
  dive: dive
}))();

export default Norman;
