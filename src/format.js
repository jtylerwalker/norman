import { diveToValue } from "./n-map";

/**
 *
 * partial application function that accepts path on first invocation
 * it will retreive the value of json and return as the first argument of the callback
 *
 * accepts a callback and array of arguments on second invocation
 * first argument is always the value of the path
 *
 * key and json are passed on the final invocation when iterating over the object.keys in the model function
 *
 * @param  {...any} path
 */
export const format = (...path) => (cb, ...args) => (key, json) => ({
  [key]: cb(diveToValue(json, ...path), ...args)
});
