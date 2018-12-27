import { dive } from "./dive";
/**
 * iterates over blueprint keys and returns an object matching the blueprint structure
 * @param {} blueprint
 * @param {*} json
 */
const _modelObj = (json, blueprint) => {
  return Object.keys(blueprint).reduce((acc, key) => {
    // if array get nested property value
    if (Array.isArray(blueprint[key])) {
      return Object.assign(acc, {
        [key]: dive(blueprint[key], json)
      });
    }
    // if has key of "child" it is blueprint. It should return modeled value
    else if (key === "child") {
      let keys = Object.keys(blueprint[key]);
      json = blueprint[key][keys[1]];
      blueprint = blueprint[key][keys[0]];

      return Object.assign(acc, {
        [keys[0]]: model(json, blueprint)
      });
    }
    // key matches JSON prop, return the value
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
const _modelArr = (json, blueprint) =>
  json.reduce((acc, val) => acc.concat(_modelObj(val, blueprint)), []);

/**
 * Models a json obj based on the Model blueprint
 * @param {} blueprint
 * @param {*} json
 */
export const model = (json, blueprint, ...children) => {
  const model =
    json.length > 0 ? _modelArr(json, blueprint) : _modelObj(json, blueprint);

  const childObj = children.reduce((acc, child) => {
    const objProperty = Object.keys(child)[0];
    return { [objProperty]: child[objProperty] };
  }, {});

  return Object.assign(model, childObj);
};
