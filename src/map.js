import { model } from "./model";

export const map = (blueprint, json) =>
  json.reduce((acc, val) => acc.concat(model(blueprint, val)), []);
