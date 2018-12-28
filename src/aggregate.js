import { diveToValue } from "./n-map";

/**
 *
 * partial application function that allows for aggregating of json values
 * accepts a path that leads to a value
 * first invocation without arguments assumes current json is already an array
 * returns object value pair with array as value
 *
 * @param  {...any} path
 */
export const aggregate = (...path) => (...aggregatePath) => (key, json) =>
  path.length === 0
    ? { [key]: diveToValue(json, ...aggregatePath) }
    : {
        [key]: diveToValue(json, ...path).map(val =>
          diveToValue(val, ...aggregatePath)
        )
      };

export const childAggregate = (...path) => (key, json) => {};
