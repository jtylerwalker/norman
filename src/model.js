const _modelObj = (json, blueprint) => {
  return Object.keys(blueprint).reduce((acc, mapping) => {
    const mapFunc = blueprint[mapping][0];

    return Object.assign(acc, mapFunc(blueprint, mapping, json));
  }, {});
};

const _modelArr = (json, blueprint) =>
  json.reduce((acc, val) => acc.concat(_modelObj(val, blueprint)), []);

export const _model = (json, blueprint, ...children) => {
  const model =
    json.length > 0 ? _modelArr(json, blueprint) : _modelObj(json, blueprint);

  const childObj = children.reduce((acc, child) => {
    const objProperty = Object.keys(child)[0];
    return { [objProperty]: child[objProperty] };
  }, {});

  return Object.assign(model, childObj);
};

export const model = (json, blueprint) => {
  return Array.isArray(json)
    ? _modelArr(json, blueprint)
    : _modelObj(json, blueprint);
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
