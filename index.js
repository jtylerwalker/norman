const N = require("./src/index");

const bp = { id: "id", data: "data"};
const json = { "id": 5, data: { result: "result" }};

console.log(N.map(bp, json));