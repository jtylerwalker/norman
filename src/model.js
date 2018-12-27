import { dive } from "./dive";
import { isObject } from "./is-object";
/**
 * iterates over blueprint keys and returns an object matching the blueprint structure
 * @param {} blueprint
 * @param {*} json
 */
const modelObj = (json, blueprint) => {
  return Object.keys(blueprint).reduce((acc, key) => {
    // if array get nested object
    if (Array.isArray(blueprint[key])) {
      return Object.assign(acc, {
        [key]: dive(blueprint[key], json)
      });
    }
    // if isObject, is blueprint return modeled value
    else if (key === "child") {
      let keys = Object.keys(blueprint[key]);
      json = blueprint[key][keys[1]];
      blueprint = blueprint[key][keys[0]];

      return Object.assign(acc, {
        [keys[0]]: model(json, blueprint)
      });
    }
    // return the value
    else {
      return Object.assign(acc, {
        [key]: json[blueprint[key]]
      });
    }
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
