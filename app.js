import Norman from "./src/index";
import { mock_photos } from "./src/__mockData__/photos";

let json;

const PhotoModel = {
  id: "id",
  farm: "farm"
};

json = mock_photos["photos"]["photo"];

const PhotosModel = {
  page: "page",
  total: "total",
  child: {
    photos: PhotoModel,
    json
  }
};

json = mock_photos["photos"];
// Norman.retrieve
// Norman.child
// Norman.model
// Norman.isObject
// Norman.findWhere
// Norman.only

let photos = Norman.model(json, PhotosModel);

console.warn(photos);
