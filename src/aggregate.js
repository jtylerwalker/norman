import { diveToValue } from "./n-map";

export const aggregate = (...path) => (...aggregatePath) => (key, json) =>
  path.length === 0
    ? { [key]: diveToValue(json, ...aggregatePath) }
    : {
        [key]: diveToValue(json, ...path).map(val =>
          diveToValue(val, ...aggregatePath)
        )
      };

export const childAggregate = (...path) => (key, json) => {};
