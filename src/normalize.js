const _normalizeObj = (json, blueprint) => {
  return Object.keys(blueprint).reduce((acc, mapping) => {
    const mapFunc = blueprint[mapping][0];

    return Object.assign(acc, mapFunc(blueprint, mapping, json));
  }, {});
};

const _normalizeArr = (json, blueprint) =>
  json.reduce((acc, val) => acc.concat(_normalizeObj(val, blueprint)), []);

export const model = (json, blueprint) => {};

export const normalize = (json, blueprint) => {
  return Array.isArray(json)
    ? _normalizeArr(json, blueprint)
    : _normalizeObj(json, blueprint);
};

export const mapFrom = (blueprint, mapping, json) => {
  const to = mapping;
  const from = blueprint[mapping][1];

  return { [to]: json[from] };
};

export const childFrom = (blueprint, mapping) => {
  const to = mapping;
  const childJSON = blueprint[mapping][2];
  const childBP = blueprint[mapping][3];

  return { [to]: model(childJSON, childBP) };
};

export const formatFrom = (blueprint, mapping) => {
  const to = mapping;
  const cb = blueprint[mapping][1];
  const args = [blueprint[mapping][2]];

  return { [to]: cb(...args) };
};

export const diveTo = (blueprint, mapping, json) => {
  const to = mapping;
  const from = blueprint[mapping][1];
  const value = from.reduce((acc, map) => acc[map], json);

  return { [to]: value };
};

export const isObject = entity => {
  if (!entity) return false;
  return entity && typeof entity === "object" && entity.constructor === Object;
};
