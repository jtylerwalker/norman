import { aggregate } from "../aggregate";
import { modelChild } from "../model-child";
import { model, all } from "../model";
import { ditto as json } from "../__mockData__/themarbles";

describe("aggregate", () => {
  let blueprint;
  let modelled;

  beforeEach(() => {
    blueprint = {
      name: "name",
      allStats: aggregate("stats")("stat", "name")
    };

    modelled = model(blueprint, json)(all);
  });

  it("should be a valid function", () => {
    expect(aggregate).toBeDefined();
  });

  it("should return an array of values", () => {
    expect(modelled.allStats).toHaveLength(json["stats"].length);
  });

  it("should normalize aggregates correctly", () => {
    let childBlueprint = {
      baseStat: "base_stat",
      effort: "effort"
    };
    blueprint = {
      stats: modelChild(childBlueprint, json["stats"], {
        statNames: aggregate("stat", "name")
      })
    };

    const modelWithChild = model(blueprint, json)(all);
  });
});
