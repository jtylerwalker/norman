import { model, all, first, last, nth, findBy, sortBy, remove } from "../model";
import { posts as mock_posts } from "../__mockData__/posts";
import { aggregate } from "../aggregate";

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
      mock_posts,
      {
        userIds: aggregate("userId")
      }
    );
  });

  it("should be a valid function", () => {
    expect(model).not.toBeUndefined();
  });

  describe("Model selector methods", () => {
    it("should have a method 'all' that returns all entities into an array", () => {
      expect(posts(all).ids).toHaveLength(mock_posts.length);
    });

    it("should have a method 'first' that returns first entity", () => {
      expect(posts(first)).toMatchObject(mock_posts[0]);
    });

    it("should have a method 'last' that returns last entity", () => {
      expect(posts(last)).toMatchObject(mock_posts[mock_posts.length - 1]);
    });

    it("should have a method 'nth' that returns the nth entitiy", () => {
      expect(posts(nth, 3)).toMatchObject(mock_posts[3]);
    });
  });

  describe("findBy methods", () => {
    it("should have a method 'findBy' that returns all entities that match query", () => {
      expect(posts(findBy, { userId: 10 })(all).ids.length).toBe(10);
    });

    it("should have a method 'findBy' that can match multiple queries", () => {
      const foundPosts = posts(findBy, {
        userId: 10,
        title: "quas fugiat ut perspiciatis vero provident"
      })(all);
      expect(foundPosts.ids.length).toBe(1);
      expect(foundPosts.ids[0]).toBe(97);
    });
  });

  describe("sort method", () => {
    it("should have a method 'sortBy' that accepts a parameter to sort by", () => {
      const postsSorted = posts(sortBy, "body")(all);
      expect(postsSorted.ids[0]).toBe(61);
    });
  });

  describe("remove method", () => {
    it("should have a method 'remove' that removes an item based on param", () => {
      const postsRemoved = posts(remove, 1)(all);
      expect(postsRemoved.ids).not.toContain(1);
    });
  });
});
