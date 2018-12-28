/**
 *
 * Evaluates whether argument is of type "object"
 *
 * @param {*} x
 */
export const isObject = x => {
  if (!x) return false;
  return x && typeof x === "object" && x.constructor === Object;
};

/**
 *
 * Evaluates whether parameter is of type "function"
 *
 * @param {*} x
 */
export const isFunction = x => {
  if (!x) return false;
  return x && Object.prototype.toString.call(x) == "[object Function]";
};
