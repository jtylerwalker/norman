import { isFunction } from "./helpers";
import { nMap } from "./n-map";

/**
 *
 * returns a normalized data object or iterates over an array of objects and
 * invokes the _normalizeObj function.
 *
 * @param {*} json
 * @param {*} blueprint
 */
export const normalize = (json, blueprint, aggregates) => {
  return Array.isArray(json)
    ? _normalizeArr(json, blueprint, aggregates)
    : _normalizeObj(json, blueprint);
};

const _normalizeObj = (json, blueprint) => {
  const keys = Object.keys(blueprint);

  return keys.reduce((acc, key) => {
    const mapping = isFunction(blueprint[key])
      ? blueprint[key](key, json)
      : nMap(blueprint[key])(key, json);

    return Object.assign(acc, mapping);
  }, {});
};

const _normalizeArr = (json, blueprint, aggregates) => {
  const defaultacc = _buildAcc(aggregates);
  return json.reduce((acc, entity, index) => {
    const id = entity["id"] || index;
    const mappedEntity = _normalizeObj(entity, blueprint);

    aggregates &&
      Object.keys(aggregates).map(key => {
        const jsonvalue = aggregates[key](json[index]);
        if (acc[key].indexof(jsonvalue) === -1) {
          acc[key] = acc[key].concat(jsonvalue);
        }
      });

    return _setAccValues(acc, id, mappedEntity);
  }, defaultacc);
};

const _setAccValues = (acc, id, entity) => {
  acc.find = Object.assign(acc.find, { [id]: entity });
  acc.ids = acc.ids.concat(id);

  return acc;
};

const _buildAcc = aggregates => {
  let defaultAcc = { find: {}, ids: [] };

  aggregates &&
    Object.keys(aggregates).map(
      key => (defaultAcc = Object.assign({}, defaultAcc, { [key]: [] }))
    );

  return defaultAcc;
};
