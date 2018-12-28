import { model } from "../model";
import { ditto as json } from "../__mockData__/themarbles";

describe("model", () => {
  it("should be a valid function", () => {
    expect(model).not.toBeUndefined();
  });
});
