import { model } from "./model";
import { isFunction } from "./helpers";
import { nMap, diveToValue } from "./n-map";

/**
 * returns a normalized data object
 * @param {*} json
 * @param {*} blueprint
 */
export const normalize = (json, blueprint) => {
  return Array.isArray(json)
    ? _normalizeArr(json, blueprint)
    : _normalizeObj(json, blueprint);
};

const _normalizeObj = (json, blueprint) => {
  const keys = Object.keys(blueprint);

  return keys.reduce((acc, key, index) => {
    const mapping = isFunction(blueprint[key])
      ? blueprint[key](key, json)
      : nMap(blueprint[key])(key, json);

    return Object.assign(acc, mapping);
  }, {});
};

const _normalizeArr = (json, blueprint) => {
  return json.reduce((acc, val, index) => {
    const obj = _normalizeObj(val, blueprint);
    const withId = Object.assign({}, { id: val["id"] || index }, obj);

    return acc.concat(withId);
  }, []);
};
