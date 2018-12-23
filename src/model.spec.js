import { model } from "./model.js";
import { posts } from "./__mockData__/posts";

describe("Model", () => {
  let blueprint;

  beforeEach(() => {
    blueprint = {
      user_id: "userId",
      id: "id"
    };
  });

  it("should be a valid function", () => {
    expect(model).not.toBeUndefined();
  });

  it("should return an object from that matches blueprint", () => {
    const modeled = model(posts[0], blueprint);
    expect(modeled).toEqual({ user_id: 1, id: 1 });
  });

  it("should return an array of objects that matches blueprint", () => {
    const modeled = model(posts, blueprint);
    expect(modeled[0]).toEqual({ user_id: 1, id: 1 });
  });

  it("should Model an array if json obj is array", () => {
    const modeledArr = model(posts, blueprint);
    expect(modeledArr).toHaveLength(posts.length);
  });
});
