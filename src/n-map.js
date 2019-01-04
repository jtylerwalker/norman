/**
 *
 * path leads to JSON object value e.g.
 * {
 *   "hello": {
 *     "world": {
 *       "foo": "bar"
 *     }
 *   }
 * }
 * to access value of "foo" you would invoke the function with path to "foo"
 * e.g. nMap("hello", "world", "foo")
 * returns a key value pair from an array of params
 *
 * @param  {...any} path
 */
export const nMap = path => (key, json) => ({
  [key]: diveToJSONValue(json, path)
});

/**
 * helper function that handles argument reduction to the last prop in the path
 * returns the value of the prop
 *
 * @param {*} json
 * @param  {...any} path
 */
export const diveToJSONValue = (json, path) => {
  const pathArr = Array.isArray(path) ? path : [path];
  return pathArr.reduce((acc, key) => acc[key], json);
};
