export const objectDive = (arr, json) =>
  arr.reduce((acc, val) => acc[val], json);
