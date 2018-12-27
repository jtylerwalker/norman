import { normalize, isObject } from "./normalize";

export const Model = (json, blueprint, methods) => {
  return methods
    ? Object.assign({}, methods, { all: () => normalize(json, blueprint) })
    : Object.assign({}, _methods, { all: () => normalize(json, blueprint) });
};

const _methods = {
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
      a = isObject(a) ? a[by] : a;
      b = isObject(b) ? b[by] : b;

      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });

    return entries;
  },
  pop: () => {}
};
