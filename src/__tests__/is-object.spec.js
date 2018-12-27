import { isObject } from "../normalize";

describe("isObject", () => {
  it("should be a valid function", () => {
    expect(isObject).toBeDefined();
  });

  it("should return true if passed object literal", () => {
    let ol = { foo: "bar", baz: "quux" };
    expect(isObject(ol)).toBe(true);
  });

  it("should return false for an empty object", () => {
    expect(isObject({})).toBe(true);
  });

  it("should return false for string", () => {
    let str = "Hello world";
    expect(isObject(str)).toBe(false);
  });

  it("should return false for number", () => {
    let num = 100;
    expect(isObject(num)).toBe(false);
  });

  it("should return false for an array", () => {
    let arr = [1, 2, 3, 4];
    expect(isObject(arr)).toBe(false);
  });

  it("should return false for all falsy values", () => {
    expect(isObject(undefined)).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject([])).toBe(false);
    expect(isObject("")).toBe(false);
    expect(isObject(0)).toBe(false);
  });

  it("should return false for constructors", () => {
    expect(isObject(new Number(42))).toBe(false);
    expect(isObject(new Number({}))).toBe(false);
  });
});
