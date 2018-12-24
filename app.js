import Norman from "./src/index";
import { mock_photos } from "./src/__mockData__/photos";

const PhotosModel = {
  page: "page",
  total: "total"
};

const PhotoModel = {
  id: "id",
  farm: "farm"
};

let photo = Norman.model(mock_photos["photos"]["photo"], PhotoModel);
let photos = Norman.model(mock_photos["photos"], PhotosModel, {
  photos: photo
});

console.warn(photos);
