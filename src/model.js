import { normalize } from "./normalize";

/**
 * Returns a modelled curry function based on json and blueprint schema
 * @param {*} blueprint
 * @param {*} json
 */
export const model = (blueprint, json) => (func, ...params) =>
  func
    ? func(normalize(json, blueprint), ...params)
    : all(normalize(json, blueprint));

/**
 * Returns all modeled entries
 * @param {*} entries
 */
export const all = entries => entries;

/**
 * Returns first entry of array
 * @param {*} entries
 */
export const first = entries => entries[0];

/**
 * returns last entry of array
 * @param {*} entries
 */
export const last = entries => entries[entries.length - 1];

/**
 * curried function that returns filtered array
 * @param {*} entries
 * @param {*} param
 * @param {*} val
 */
export const findBy = (entries, param, val) => func =>
  func(entries.filter(entry => entry[param] === val));

/**
 * returns first of filtered "findBy" array
 * @param {*} entries
 * @param {*} param
 * @param {*} val
 */
export const firstBy = (entries, param, val) =>
  findBy(entries, param, val)(first);

/**
 * returns last of filtered "findBy" array
 * @param {} entries
 * @param {*} param
 * @param {*} val
 */
export const lastBy = (entries, param, val) =>
  findBy(entries, param, val)(last);

/**
 * curried function that uses callback to filter entries
 * @param {*} entries
 * @param {*} callback
 */
export const findWhere = (entries, callback) => func => func(callback(entries));

/**
 * returns all entries from "findWhere" function
 * @param {*} entries
 * @param {*} callback
 */
export const findAllWhere = (entries, callback) =>
  findWhere(entries, callback)(all);

/**
 * returns first entry from "findWhere" function
 * @param {*} entries
 * @param {*} callback
 */
export const findFirstWhere = (entries, callback) =>
  findWhere(entries, callback)(first);

/**
 * returns last entry from "findWhere" function
 * @param {*} entries
 * @param {*} callback
 */
export const findLastWhere = (entries, callback) =>
  findWhere(entries, callback)(last);

/**
 * wraps sort method to return sorted entries
 * @param {*} entries
 * @param {*} param
 */
export const sortBy = (entries, param) =>
  entries.sort((a, b) => (a < b && -1) || (a > b && 1) || 0);

/**
 * returns new entriesarray after removing entry based on params
 * @param {*} entries
 * @param {*} param
 * @param {*} val
 */
export const removeBy = (entries, param, val) =>
  entries.filter(entry => entry[param] !== val);

// strip give a smaller more manageable object
