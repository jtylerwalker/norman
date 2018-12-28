import * as N from "../normalize";
import { ditto as json } from "../__mockData__/themarbles";

describe("model", () => {
  let blueprint;
  let childBlueprint;

  it("should be a valid function", () => {
    expect(N.model).not.toBeUndefined();
  });

  describe.skip("normalize", () => {
    it("should be a valid function", () => {
      expect(N.normalize).not.toBeUndefined();
    });

    it.skip("should return a new object based on blueprint", () => {
      blueprint = Object.assign({}, blueprint, { id: "id" });
      const normalized = N.model(blueprint, json)(N.all);
      expect(normalized).toMatchObject({ id: json["id"] });
    });

    it("should accept an array as a json matcher", () => {
      blueprint = Object.assign({}, { name: ["name"] });
      const normalized = N.model(blueprint, json)(N.all);
      expect(normalized).toMatchObject({ name: json["name"] });
    });
  });

  describe.skip("map", () => {
    it("should be a valid function", () => {
      expect(N.map).not.toBeUndefined();
    });

    it("should be a curried function", () => {
      let mapped = N.map()();
      expect(mapped).toMatchObject({ undefined: undefined });
    });

    it("should accept path to value as multiple args", () => {
      let mapped = N.map("species", "name")("key", json);
      expect(mapped).toMatchObject({ key: json["species"]["name"] });
    });
  });

  describe("child", () => {
    beforeEach(() => {
      childBlueprint = {
        baseStat: "base_stat"
      };

      blueprint = {
        id: "id",
        name: "name",
        stats: N.child(childBlueprint, json["stats"])
      };
    });
    it("should be a valid function", () => {
      expect(N.child).not.toBeUndefined();
    });

    it("should assign id if none in blueprint", () => {
      let modelWithChild = N.model(blueprint, json)(N.all);
      expect(modelWithChild).toMatchObject({});
    });

    it("should model a child object and normalize json accordingly", () => {
      let modelWithChild = N.model(blueprint, json)(N.all);
      expect(modelWithChild).toMatchObject({
        id: json["id"],
        name: json["name"],
        stats: {
          find: {
            "6": {
              id: json["stats"][0]["id"],
              baseStat: json["stats"][0]["base_stat"]
            },
            "5": {
              id: json["stats"][1]["id"],
              baseStat: json["stats"][1]["base_stat"]
            }
          },
          ids: [6, 5]
        }
      });
    });
  });
});
