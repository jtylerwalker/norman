import { format } from "../format";
import { model, all } from "../model";
import { ditto as json } from "../__mockData__/themarbles";

describe("format", () => {
  let blueprint;
  let modelled;

  const upperCaseText = text => text.toUpperCase();
  const addStrings = (text, ...args) => `${text} ${args.join(" ")}`;

  beforeEach(() => {
    blueprint = {
      name: format("name")(upperCaseText),
      lottaText: format("name")(addStrings, "how", "now", "brown", "cow")
    };

    modelled = model(blueprint, json)(all);
  });

  it("should be a valid function", () => {
    expect(format).not.toBeUndefined();
  });

  it("should format return value based on callback", () => {
    expect(modelled.name).toBe(json["name"].toUpperCase());
  });

  it("should accept multiple arguments", () => {
    expect(modelled.lottaText).toBe(`${json["name"]} how now brown cow`);
  });
});
