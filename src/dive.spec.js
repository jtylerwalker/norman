import { model } from "./model";
import { dive } from "./dive";
import { posts } from "./__mockData__/posts";

describe("dive", () => {
  let blueprint;

  beforeEach(() => {
    blueprint = {
      user_id: "userId",
      id: "id",
      nestedId: ["ids", "id"]
    };
  });

  it("should be a valid function", () => {
    expect(dive).not.toBeUndefined();
  });

  it("should return correct value for nested object mapping", () => {
    const shallowMap = { ids: { id: 1 } };
    const mapped = dive(["ids", "id"], { ids: { id: 1 } }, shallowMap);
    expect(mapped).toBe(1);

    const deepMap = { ids: { id: { more: { values: "hello" } } } };
    const deeplyMapped = dive(["ids", "id", "more", "values"], deepMap);
    expect(deeplyMapped).toBe("hello");
  });

  it("should be able to model nested objects", () => {
    const modeled = model(
      Object.assign(posts[0], { ids: { id: 1 } }),
      blueprint
    );
    expect(modeled).toEqual({ user_id: 1, id: 1, nestedId: 1 });
  });
});
