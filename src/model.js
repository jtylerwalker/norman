import { normalize, isObject } from "./normalize";

export const Model = (json, blueprint) => (func, ...params) =>
  func(normalize(json, blueprint), ...params);

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

export const sortBy = (entries, param) => {
  return entries.sort((a, b) => {
    a = isObject(a) ? a[param] : a;
    b = isObject(b) ? b[param] : b;

    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });
};

export const removeBy = (entries, param, val) =>
  entries.filter(entry => entry[param] !== val);
