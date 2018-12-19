import { model, map, objectDive } from "./index.js";
import { posts } from "./__mockData__/posts.js";

describe("Model", () => {
  let bluePrint;

  beforeEach(() => {
    bluePrint = {
      user_id: "userId",
      id: "id"
    }
  });

  it("should be a valid function", () => {
    expect(model).not.toBeUndefined();
  });

  it("Should return a modeled object from json to Model blueprint", () => {
    const modeled = model(bluePrint, posts[0]);
    expect(modeled).toEqual({ user_id: 1, id: 1 });
  });

  it("should accept model an array if json obj is array", () => {
    const modeledArr = map(bluePrint, posts);
    expect(modeledArr).toHaveLength(posts.length);
  });

  it("should return correct value for nested object mapping", () => {
    const shallowMap = {"ids": { "id" : 1 }};
    const mapped = objectDive(["ids", "id"], {"ids" : { "id" : 1}}, shallowMap);
    expect(mapped).toBe(1);

    const deepMap = {"ids": { "id" : { "more": { "values": "hello" }}}};
    const deeplyMapped = objectDive(["ids", "id", "more", "values"], deepMap);
    expect(deeplyMapped).toBe("hello");
  });

  it("should be able to model nested objects", () => {
    const modeled = model(
      Object.assign(bluePrint, { nestedId: ["ids", "id"] }),
      Object.assign(posts[0], { "ids": { "id": 1 }})
    );
    expect(modeled).toEqual({ user_id: 1, id: 1, nestedId: 1 });
  });
});