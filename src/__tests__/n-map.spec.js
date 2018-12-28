import { nMap } from "../n-map";
import { ditto as json } from "../__mockData__/themarbles";

describe("nMap", () => {
  it("should be a valid function", () => {
    expect(nMap).not.toBeUndefined();
  });

  it("should be a curried function", () => {
    let mapped = nMap()();
    expect(mapped).toMatchObject({ undefined: undefined });
  });

  it("should accept path to value as multiple args", () => {
    let mapped = nMap("species", "name")("key", json);
    expect(mapped).toMatchObject({ key: json["species"]["name"] });
  });
});
