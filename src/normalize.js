import { model } from "./model";
import { isFunction } from "./helpers";

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
      : map(blueprint[key])(key, json);
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

const _diveToValue = (json, ...path) => {
  return path.reduce((acc, key) => acc[key], json);
}

export const map = (...path) => (key, json) => {
  return { [key]: path.reduce((acc, pathKey) => acc[pathKey], json) };
};

export const child = (childBlueprint, childJSON) => key => {
  const childModel = model(childBlueprint, childJSON)().reduce(
    (acc, child, index) => {
      const id = child["id"] || index;
      acc.find = Object.assign(acc.find, { [child["id"] || index]: child });
      acc.ids = acc.ids.concat(id);
      return acc;
    },
    { find: {}, ids: [] }
  );
  return { [key]: childModel };
};

export const format = (...path) => (cb, ...args) => (key, json) => {
  const value = map(...path)(key, json);
  return { [key]: cb(value[key], ...args) };
};

export const aggregate = (...path) => (...aggregatePath) => (key, json) => {
  return {
    [key] : _diveToValue(json, ...path).map(val => 
    _diveToValue(val, ...aggregatePath))
  };
};
