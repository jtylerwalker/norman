import { diveToValue } from "./n-map";

export const format = (...path) => (cb, ...args) => (key, json) => ({
  [key]: cb(diveToValue(json, ...path), ...args)
});
