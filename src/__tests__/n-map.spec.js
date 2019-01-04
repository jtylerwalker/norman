import { nMap, diveToJSONValue } from "../n-map";
import { ditto as json } from "../__mockData__/themarbles";

describe("nMap", () => {
  it("should be a valid function", () => {
    expect(nMap).not.toBeUndefined();
  });

  it("should be a curried function", () => {
    let mapped = nMap(["species", "name"])("key", json);
    expect(mapped).not.toBeUndefined();
  });

  it("should accept path to value as multiple args", () => {
    let mapped = nMap(["species", "name"])("key", json);
    expect(mapped).toMatchObject({ key: json["species"]["name"] });
  });
});

describe("diveToJSONValue", () => {
  it("should return value given path as args", () => {
    let value = diveToJSONValue(json, ["species", "name"]);
    expect(value).toBe(json["species"]["name"]);
  });
});
