import {
  model,
  all,
  first,
  last,
  nth,
  findBy,
  firstBy,
  lastBy,
  findWhere
} from "../model";
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

  it("should have a method 'all' that returns all entities into an array", () => {
    expect(posts(all)).toHaveLength(mock_posts.length);
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

  it("should have a method 'findBy' that returns all entities that match query", () => {
    expect(posts(findBy, "userId", 1)(all)).toHaveLength(10);
  });

  it("should have a method 'firstBy' that returns first entity that matches query", () => {
    expect(posts(firstBy, "id", 1)).toMatchObject(mock_posts[0]);
    expect(posts(firstBy, "userId", 1)).toMatchObject(mock_posts[0]);
  });

  it("should have a method 'lastBy' that returns last entity that matches query", () => {
    expect(posts(lastBy, "id", 1)).toMatchObject(mock_posts[0]);
    expect(posts(lastBy, "userId", 1)).toMatchObject(mock_posts[9]);
  });

  it("should have a method 'findWhere' that takes a callback to sort entities", () => {
    const userIdIsLargerThan1 = entities => entities.filter(e => e.userId > 1);
    posts(findWhere, userIdIsLargerThan1)(all).map(e =>
      expect(e.userId).toBeGreaterThan(1)
    );
  });
});
