/**
 * path leads to JSON object e.g.
 * {
 *   "hello": {
 *     "world": {
 *       "foo": "bar"
 *     }
 *   }
 * }
 *
 * to access value of "foo" you would invoke the function with path too "foo"
 *
 * nMap("hello", "world", "foo")
 *
 * returns a key value pair from an array of params
 *
 * @param  {...any} path
 */
export const nMap = (...path) => (key, json) => ({
  [key]: diveToValue(json, ...path)
});

/**
 * helper function that handles the iteration to the last prop
 * returns the value of the prop
 *
 * @param {*} json
 * @param  {...any} path
 */
export const diveToValue = (json, ...path) =>
  path.reduce((acc, key) => acc[key], json);
