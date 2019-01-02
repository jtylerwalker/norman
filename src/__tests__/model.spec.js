import { model, all } from "../model";
import { posts as mock_posts } from "../__mockData__/posts";

describe("model", () => {
  let posts;
  beforeEach(() => {
    posts = model(
      {
        userId: "userId",
        id: "id",
        title: "title",
        body: "body"
      },
      mock_posts
    );
  });

  it("should be a valid function", () => {
    expect(model).not.toBeUndefined();
  });

  it("should have a method to aggregate all entities into an array", () => {
    expect(posts(all)).toHaveLength(mock_posts.length);
  });
});
