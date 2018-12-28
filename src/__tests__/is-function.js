import { isFunction } from "../helpers";

describe("isFunction", () => {
  it("should be a valid function", () => {
    expect(isFunction).toBeDefined();
  });

  it("should return true if passed a function expression", () => {
    const func = () => {};
    expect(isFunction(func)).toBe(true);
  });

  it("should return true if passed a function declaration", () => {
    function func() {};
    expect(isFunction(func)).toBe(true);
  });

  it("should return false if passed object literal", () => {
    let ol = { foo: "bar", baz: "quux" };
    expect(isFunction(ol)).toBe(false);
  });

  it("should return false for an empty object", () => {
    expect(isFunction({})).toBe(false);
  });

  it("should return false for string", () => {
    let str = "Hello world";
    expect(isFunction(str)).toBe(false);
  });

  it("should return false for number", () => {
    let num = 100;
    expect(isFunction(num)).toBe(false);
  });

  it("should return false for an array", () => {
    let arr = [1, 2, 3, 4];
    expect(isFunction(arr)).toBe(false);
  });

  it("should return false for all falsy values", () => {
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction([])).toBe(false);
    expect(isFunction("")).toBe(false);
    expect(isFunction(0)).toBe(false);
  });

  it("should return false for constructors", () => {
    expect(isFunction(new Number(42))).toBe(false);
    expect(isFunction(new Number({}))).toBe(false);
  });
});
