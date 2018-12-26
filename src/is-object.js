export const isObject = entity => {
  if (!entity) return false;
  return entity && typeof entity === "object" && entity.constructor === Object;
};
