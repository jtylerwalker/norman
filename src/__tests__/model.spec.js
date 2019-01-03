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

  it("should have a method 'all' aggregate all entities into an array", () => {
    expect(posts(all)).toHaveLength(mock_posts.length);
  });

  it("should have a method 'first' that returns first entity", () => {
    const firstPost = posts(first);
    expect(firstPost).toMatchObject(mock_posts[0]);
  });

  it("should have a method 'last' that returns last entity", () => {
    const lastPost = posts(last);
    expect(lastPost).toMatchObject(mock_posts[mock_posts.length - 1]);
  });

  it("should have a method 'nth' that returns the nth entitiy", () => {
    const nthPost = posts(nth, 3);
    expect(nthPost).toMatchObject(mock_posts[3]);
  });

  it("should have a method 'findBy' that returns all entities that match query", () => {
    const childrenOfUser1 = posts(findBy, "userId", 1)(all);
    expect(childrenOfUser1).toHaveLength(10);
  });

  it("should have a method 'firstBy' that returns first entity that matches query", () => {
    const firstPostById = posts(firstBy, "id", 1);
    const firstPostByUserId = posts(firstBy, "userId", 1);
    expect(firstPostById).toMatchObject(mock_posts[0]);
    expect(firstPostByUserId).toMatchObject(mock_posts[0]);
  });

  it("should have a method 'lastBy' that returns last entity that matches query", () => {
    const lastPostById = posts(lastBy, "id", 1);
    const lastPostByUserId = posts(lastBy, "userId", 1);
    expect(lastPostById).toMatchObject(mock_posts[0]);
    expect(lastPostByUserId).toMatchObject(mock_posts[9]);
  });

  it("should have a method 'findWhere' that takes a callback to sort entities", () => {
    const userIdLargerThan1 = entities =>
      entities.filter(entity => Number(entity.userId) > 1);
    const entities = posts(findWhere, userIdLargerThan1);
    entities(all).map(entity =>
      expect(Number(entity.userId)).toBeGreaterThan(1)
    );
  });
});
