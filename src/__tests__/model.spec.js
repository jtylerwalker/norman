import { posts } from "../__mockData__/posts";
import { mock_photos } from "../__mockData__/photos";
import { model, mapFrom, childFrom } from "../normalize";

describe("Model", () => {
  const photos = mock_photos["photos"];
  let blueprint;

  beforeEach(() => {
    blueprint = {
      user_id: [mapFrom, "userId"],
      id: [mapFrom, "id"]
    };
  });

  it("should be a valid function", () => {
    expect(model).not.toBeUndefined();
  });

  it("should return an object that matches blueprint", () => {
    const modeled = model(posts[0], blueprint);
    expect(modeled).toEqual({ user_id: 1, id: 1 });
  });

  it("should return an array of objects that each match blueprint", () => {
    const modeled = model(posts, blueprint);
    expect(modeled[0]).toEqual({ user_id: 1, id: 1 });
  });

  it("should Model an array if json obj is array", () => {
    const modeledArr = model(posts, blueprint);
    expect(modeledArr).toHaveLength(posts.length);
  });

  it("should accept a nested blueprint", () => {
    const childBP = {
      id: [mapFrom, "id"]
    };
    const photosBP = {
      count: [mapFrom, "total"],
      page: [mapFrom, "page"],
      photos: [childFrom, "photo", photos["photo"], childBP]
    };

    const modeledPhotos = model(photos, photosBP);

    expect(modeledPhotos.count).toBe(photos["total"]);
    expect(modeledPhotos.page).toBe(photos["page"]);
    expect(modeledPhotos.photos[0].id).toBe(photos["photo"][0].id);
  });
});
