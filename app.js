import Norman from "./src/index";
import { posts } from "./src/__mockData__/posts";

const bp = { id: "id", data: "userId", title: "title" };

console.log(Norman.map(bp, posts));
