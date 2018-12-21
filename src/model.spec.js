import { model } from "./model.js";
import { posts } from "./__mockData__/posts";

describe("Model", () => {
  let bluePrint;

  beforeEach(() => {
    bluePrint = {
      user_id: "userId",
      id: "id"
    };
  });

  it("should be a valid function", () => {
    expect(model).not.toBeUndefined();
  });

  it("Should return a modeled object from json to Model blueprint", () => {
    const modeled = model(bluePrint, posts[0]);
    expect(modeled).toEqual({ user_id: 1, id: 1 });
  });
});
