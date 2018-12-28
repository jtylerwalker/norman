import { model } from "./model";
import { isFunction } from "./helpers";

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

export const map = (...mapping) => (key, json) => {
  return { [key]: mapping.reduce((acc, map) => acc[map], json) };
};

export const format = (cb, ...args) => key => ({ [key]: cb(...args) });

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

export const aggregate = (entry, ...path) => (key, json) => ({
  // helper function for reduce
  [key]: json[entry].map(item => path.reduce((acc, map) => acc[map], item))
});
