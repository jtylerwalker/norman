import { dive } from "./dive";

/**
 * iterates over blueprint and returns an array of objects to match the blueprint model
 * @param {} blueprint
 * @param {*} json
 */
export const model = (blueprint, json) => {
  return Object.keys(blueprint).reduce((acc, key, index) => {
    return Object.assign(acc, {
      [key]: Array.isArray(blueprint[key])
        ? dive(blueprint[key], json)
        : json[blueprint[key]]
    });
  }, {});
};
