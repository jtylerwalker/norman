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

export const sortBy = (entries, param) =>
  entries.sort((a, b) => (a < b && -1) || (a > b && 1) || 0);

export const removeBy = (entries, param, val) =>
  entries.filter(entry => entry[param] !== val);
