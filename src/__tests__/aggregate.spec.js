import { aggregate } from "../aggregate";
import { modelChild } from "../model-child";
import { model, all } from "../model";
import { ditto as json } from "../__mockData__/themarbles";

describe("aggregate", () => {
  let blueprint;
  let childBlueprint;
  let modelled;

  beforeEach(() => {
    childBlueprint = {
      baseStat: "base_stat",
      effort: "effort"
    };
    blueprint = {
      stats: modelChild(childBlueprint, json["stats"], {
        statNames: aggregate("stat", "name")
      })
    };
    modelled = model(blueprint, json)(all);
  });

  it("should be a valid function", () => {
    expect(aggregate).toBeDefined();
  });

  it("should normalize aggregates correctly", () => {
    expect(modelled.stats.statNames).toHaveLength(modelled.stats.ids.length);
    expect(modelled.stats.statNames).toContain(
      json["stats"][0]["stat"]["name"]
    );
    expect(modelled.stats.statNames).toContain(
      json["stats"][1]["stat"]["name"]
    );
  });
});
