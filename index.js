const model = (blueprint, json) => {
  return Object.keys(blueprint).reduce((acc, key, index) => {
    return Object.assign(acc, {
        [key]: Array.isArray(blueprint[key]) 
          ? objectDive(blueprint[key], json)
          : json[blueprint[key]]
      }
    )
  }, {});
};

const map = (blueprint, json) => 
  json.reduce((acc, val) => acc.concat(model(blueprint, val)), []);

const objectDive = (arr, json) => arr.reduce((acc, val) => acc[val], json);

export { model, map, objectDive };