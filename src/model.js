import { normalize } from "./normalize";

export const model = (json, blueprint, methods) => {
  const entries = normalize(json, blueprint);
  return methods
    ? Object.assign(methods, { all: () => entries })
    : Object.assign(_modelMethods, { all: () => entries });
};

const _modelMethods = {
  find: () => console.log("finding"),
  findWhere: () => console.log("finding where"),
  sort: () => {},
  sortBy: () => {},
  pop: () => {}
};
