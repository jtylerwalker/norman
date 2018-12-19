import { map } from "./map";
import { posts } from "./__mockData__/posts";

describe("map", () => {
  let bluePrint;

  beforeEach(() => {
    bluePrint = {
      user_id: "userId",
      id: "id"
    }
  });

  it("should be a valid function", () => {
    expect(map).not.toBeUndefined();
  });

  it("should accept model an array if json obj is array", () => {
    const modeledArr = map(bluePrint, posts);
    expect(modeledArr).toHaveLength(posts.length);
  });
});