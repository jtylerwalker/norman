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

export const isObject = entity => {
  if (!entity) return false;
  return entity && typeof entity === "object" && entity.constructor === Object;
};

export const isFunction = x =>
  x && Object.prototype.toString.call(x) == "[object Function]";

export const model = (blueprint, json) => (func, ...params) =>
  func
    ? func(normalize(json, blueprint), ...params)
    : all(normalize(json, blueprint));

export const all = entries => entries;

export const first = entries => entries[0];

export const last = entries => entries[entries.length - 1];

export const findBy = (entries, param, val) => func =>
  func(entries.filter(entry => entry[param] === val));

export const firstBy = (entries, param, val) =>
  findBy(entries, param, val)(first);

export const lastBy = (entries, param, val) =>
  findBy(entries, param, val)(last);

export const findWhere = (entries, callback) => func => func(callback(entries));

export const findAllWhere = (entries, callback) =>
  findWhere(entries, callback)(all);

export const findFirstWhere = (entries, callback) =>
  findWhere(entries, callback)(first);

export const findLastWhere = (entries, callback) =>
  findWhere(entries, callback)(last);

export const sortBy = (entries, param) =>
  entries.sort((a, b) => (a < b && -1) || (a > b && 1) || 0);

export const removeBy = (entries, param, val) =>
  entries.filter(entry => entry[param] !== val);

// strip give a smaller more manageable object
