import { model } from "./model";
import { objectDive } from "./object-dive";
import { posts } from "./__mockData__/posts";

describe("objectDive", () => {
  let blueprint;

  beforeEach(() => {
    blueprint = {
      user_id: "userId",
      id: "id",
      nestedId: ["ids", "id"]
    };
  });

  it("should be a valid function", () => {
    expect(objectDive).not.toBeUndefined();
  });

  it("should return correct value for nested object mapping", () => {
    const shallowMap = { ids: { id: 1 } };
    const mapped = objectDive(["ids", "id"], { ids: { id: 1 } }, shallowMap);
    expect(mapped).toBe(1);

    const deepMap = { ids: { id: { more: { values: "hello" } } } };
    const deeplyMapped = objectDive(["ids", "id", "more", "values"], deepMap);
    expect(deeplyMapped).toBe("hello");
  });

  it("should be able to model nested objects", () => {
    const modeled = model(
      blueprint,
      Object.assign(posts[0], { ids: { id: 1 } })
    );
    expect(modeled).toEqual({ user_id: 1, id: 1, nestedId: 1 });
  });
});
