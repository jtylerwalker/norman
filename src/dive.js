/**
 * Finds child value of nested object from json
 * @param {} arr
 * @param {*} json
 */
export const dive = (arr, json) => arr.reduce((acc, val) => acc[val], json);
