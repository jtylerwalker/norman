import { dive } from "./dive";

export const model = (blueprint, json) => {
  return Object.keys(blueprint).reduce((acc, key, index) => {
    return Object.assign(acc, {
      [key]: Array.isArray(blueprint[key])
        ? dive(blueprint[key], json)
        : json[blueprint[key]]
    });
  }, {});
};
