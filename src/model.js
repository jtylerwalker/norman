import { normalize } from "./normalize";

/**
 *
 * Returns a modelled curry function based on json and blueprint schema
 * on the second invocation it accepts one of the grouping functions and params
 * if the grouping function requires them
 *
 * @param {*} blueprint
 * @param {*} json
 */
export const model = (blueprint, json) => (func, ...params) =>
  func
    ? func(normalize(json, blueprint), ...params)
    : all(normalize(json, blueprint));

/**
 *
 * Returns all modeled entities
 *
 * @param {*} entities
 */
export const all = entities => entities;

/**
 *
 * Returns first entry of array
 *
 * @param {*} entities
 */
export const first = entities => entities[0];

/**
 *
 * returns last entry of array
 *
 * @param {*} entities
 */
export const last = entities => entities[entities.length - 1];

/**
 *
 * curried function that returns filtered array
 *
 * @param {*} entities
 * @param {*} param
 * @param {*} val
 */
export const findBy = (entities, param, val) => func =>
  func(entities.filter(entry => entry[param] === val));

/**
 *
 * returns first of filtered "findBy" array
 *
 * @param {*} entities
 * @param {*} param
 * @param {*} val
 */
export const firstBy = (entities, param, val) =>
  findBy(entities, param, val)(first);

/**
 *
 * returns last of filtered "findBy" array
 *
 * @param {} entities
 * @param {*} param
 * @param {*} val
 */
export const lastBy = (entities, param, val) =>
  findBy(entities, param, val)(last);

/**
 *
 * curried function that uses callback to filter entities
 *
 * @param {*} entities
 * @param {*} callback
 */
export const findWhere = (entities, callback) => func =>
  func(callback(entities));

/**
 *
 * returns all entities from "findWhere" function
 *
 * @param {*} entities
 * @param {*} callback
 */
export const findAllWhere = (entities, callback) =>
  findWhere(entities, callback)(all);

/**
 *
 * returns first entry from "findWhere" function
 *
 * @param {*} entities
 * @param {*} callback
 */
export const findFirstWhere = (entities, callback) =>
  findWhere(entities, callback)(first);

/**
 *
 * returns last entry from "findWhere" function
 *
 * @param {*} entities
 * @param {*} callback
 */
export const findLastWhere = (entities, callback) =>
  findWhere(entities, callback)(last);

/**
 *
 * wraps sort method to return sorted entities
 *
 * @param {*} entities
 * @param {*} param
 */
export const sortBy = entities =>
  entities.sort((a, b) => (a < b && -1) || (a > b && 1) || 0);

/**
 *
 * returns new entitiesarray after removing entry based on params
 *
 * @param {*} entities
 * @param {*} param
 * @param {*} val
 */
export const removeBy = (entities, param, val) =>
  entities.filter(entry => entry[param] !== val);

// strip give a smaller more manageable object
