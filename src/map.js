import { model } from "./model";

/**
 * returns an object that matches the blueprint object from json
 * @param {} blueprint
 * @param {*} json
 */
export const map = (blueprint, json) =>
  json.reduce((acc, val) => acc.concat(model(blueprint, val)), []);
