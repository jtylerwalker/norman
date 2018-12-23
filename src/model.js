import { dive } from "./dive";

/**
 * iterates over blueprint keys and returns an object matching the blueprint structure
 * @param {} blueprint
 * @param {*} json
 */
export const modelObj = (json, blueprint) => {
  return Object.keys(blueprint).reduce((acc, key) => {
    return Object.assign(acc, {
      [key]: Array.isArray(blueprint[key])
        ? dive(blueprint[key], json)
        : json[blueprint[key]]
    });
  }, {});
};

/**
 * iterates over an orray of json objects and returns a modeled object for each entry
 * @param {} blueprint
 * @param {*} json
 */
export const modelObjArr = (json, blueprint) =>
  json.reduce((acc, val) => acc.concat(modelObj(val, blueprint)), []);

/**
 * Models a json obj based on the Model blueprint
 * @param {} blueprint
 * @param {*} json
 */
export const model = (json, blueprint) => {
  return json.length > 0
    ? modelObjArr(json, blueprint)
    : modelObj(json, blueprint);
};
