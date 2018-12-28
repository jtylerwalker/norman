import { modelChild } from "../model-child";
import { model, all } from "../model";
import { ditto as json } from "../__mockData__/themarbles";

describe("modelChild", () => {
  let modelWithChild;
  let childBlueprint;
  let blueprint;

  beforeEach(() => {
    childBlueprint = {
      baseStat: "base_stat",
      effort: "effort"
    };

    blueprint = {
      stats: modelChild(childBlueprint, json["stats"])
    };

    modelWithChild = model(blueprint, json)(all);
  });

  it("should be a valid function", () => {
    expect(modelChild).not.toBeUndefined();
  });

  it("should assign id if none in blueprint", () => {
    expect(modelWithChild).toMatchObject({});
  });

  it("should include props in blueprint", () => {
    let stat = json["stats"][0];
    expect(modelWithChild.stats.find["6"].baseStat).toBe(stat["base_stat"]);
    expect(modelWithChild.stats.find["6"].effort).toBe(stat["effort"]);
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
