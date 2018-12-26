import { dive } from "./dive";
/**
 * iterates over blueprint keys and returns an object matching the blueprint structure
 * @param {} blueprint
 * @param {*} json
 */
const modelObj = (json, blueprint) => {
  return Object.keys(blueprint).reduce((acc, key) => {
    return Object.assign(acc, {
      [key]: Array.isArray(blueprint[key])
        ? dive(blueprint[key], json)
        : json[blueprint[key]]
    });
  }, {});
};

/**
 * iterates over an orray of json objects and returns a modeled array of objects for each entry
 * @param {} blueprint
 * @param {*} json
 */
const modelArr = (json, blueprint) =>
  json.reduce((acc, val) => acc.concat(modelObj(val, blueprint)), []);

/**
 * Models a json obj based on the Model blueprint
 * @param {} blueprint
 * @param {*} json
 */
export const model = (json, blueprint, ...children) => {
  const model =
    json.length > 0 ? modelArr(json, blueprint) : modelObj(json, blueprint);

  const childObj = children.reduce((acc, child) => {
    const objProperty = Object.keys(child)[0];
    return { [objProperty]: child[objProperty] };
  }, {});

  return Object.assign(model, childObj);
};
