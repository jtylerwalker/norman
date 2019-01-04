import { normalize } from "../normalize";
import { model, all } from "../model";
import { ditto as json } from "../__mockData__/themarbles";
import { posts as mock_posts } from "../__mockData__/posts";

describe("normalize", () => {
  let blueprint;
  let posts;

  it("should be a valid function", () => {
    expect(normalize).not.toBeUndefined();
  });

  it("should return a new object based on blueprint", () => {
    blueprint = Object.assign({}, blueprint, { id: "id" });
    const normalized = model(blueprint, mock_posts)(all);
    expect(normalized.find[1]).toMatchObject(mock_posts[0]);
  });

  it("should accept an array as a json matcher", () => {
    blueprint = Object.assign({}, { name: ["name"] });
    const normalized = model(blueprint, json)(all);
    expect(normalized).toMatchObject({ name: json["name"] });
  });

  describe("formatting", () => {
    beforeEach(() => {
      posts = model(
        {
          userId: "userId",
          id: "id",
          title: "title",
          body: "body"
        },
        mock_posts
      )(all);
    });
    it("should format the objects correctly", () => {
      expect(posts.find["1"]).toMatchObject(mock_posts[0]);
      expect(posts.ids.length).toBe(mock_posts.length);
    });
  });
});
