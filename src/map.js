import { model } from "./model";

/**
 * iterates over an array and returns an array of objects modeled to blueprint
 * @param {} blueprint
 * @param {*} json
 */
export const map = (blueprint, json) =>
  json.reduce((acc, val) => acc.concat(model(blueprint, val)), []);
