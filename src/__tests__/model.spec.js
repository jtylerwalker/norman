import { normalize, map, child } from "../normalize";
import { model, all } from "../model";
import { ditto as json } from "../__mockData__/themarbles";

describe("model", () => {
  let blueprint;
  let childBlueprint;

  it("should be a valid function", () => {
    expect(model).not.toBeUndefined();
  });

  describe("normalize", () => {
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

  describe("map", () => {
    it("should be a valid function", () => {
      expect(map).not.toBeUndefined();
    });

    it("should be a curried function", () => {
      let mapped = map()();
      expect(mapped).toMatchObject({ undefined: undefined });
    });

    it("should accept path to value as multiple args", () => {
      let mapped = map("species", "name")("key", json);
      expect(mapped).toMatchObject({ key: json["species"]["name"] });
    });
  });

  describe("child", () => {
    let modelWithChild;

    beforeEach(() => {
      childBlueprint = {
        baseStat: "base_stat"
      };

      blueprint = {
        stats: child(childBlueprint, json["stats"])
      };

      modelWithChild = model(blueprint, json)(all);
    });
    it("should be a valid function", () => {
      expect(child).not.toBeUndefined();
    });

    it("should assign id if none in blueprint", () => {
      expect(modelWithChild).toMatchObject({});
    });

    it("should include props in blueprint", () => {
      let stat = json["stats"][0];
      expect(modelWithChild.stats.find["6"].baseStat).toBe(stat["base_stat"]);
    });

    it("should model a child object and normalize to include a find prop", () => {
      expect(modelWithChild.stats.find).toBeDefined();
    });

    it("should include the child id as the prop under find", () => {
      expect(modelWithChild.stats.find["6"]).toBeDefined();
      expect(modelWithChild.stats.find["5"]).toBeDefined();
    });

    it("should include an array of all child ids", () => {
      let stats = json["stats"];
      expect(modelWithChild.stats.ids).toHaveLength(json["stats"].length);
      expect(modelWithChild.stats.ids).toEqual([stats[0].id, stats[1].id]);
    });
  });
});
