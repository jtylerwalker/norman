import { normalize } from "../normalize";
import { model, all } from "../model";
import { ditto as json } from "../__mockData__/themarbles";

describe("normalize", () => {
  let blueprint;

  it("should be a valid function", () => {
    expect(normalize).not.toBeUndefined();
  });

  it("should return a new object based on blueprint", () => {
    blueprint = Object.assign({}, blueprint, { id: "id" });
    const normalized = model(blueprint, json)(all);

    expect(normalized).toMatchObject({ id: json["id"] });
  });

  it("should accept an array as a json matcher", () => {
    blueprint = Object.assign({}, { name: ["name"] });
    const normalized = model(blueprint, json)(all);

    expect(normalized).toMatchObject({ name: json["name"] });
  });
});
