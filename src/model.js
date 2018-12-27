import { normalize } from "./normalize";

// export class ModelEntry {
//   constructor(json, blueprint, methods) {
//     this.entries = normalize(json, blueprint);
//   }
// }

export function model(json, blueprint, methods) {
  const entries = normalize(json, blueprint);
  return methods
    ? Object.assign(methods, { all: () => entries })
    : Object.assign(_modelMethods, { all: () => entries });
}

const _modelMethods = {
  all: () => entries,
  findBy: function(param, val) {
    return this.all().filter(entry => entry[param] === val);
  },
  firstBy: function(param, val) {
    return this.findBy(param, val)[0];
  },
  lastBy: function(param, val) {
    const returnVal = this.findBy(param, val);
    return returnVal[returnVal.length - 1];
  },
  sortBy: function(by) {
    const entries = this.all();

    entries.sort((a, b) => {
      if (a[by] < b[by]) {
        return -1;
      }
      if (a[by] > b[by]) {
        return 1;
      }
      return 0;
    });

    return entries;
  },
  pop: () => {}
};
