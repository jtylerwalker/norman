import { model } from "./model";

export const modelChild = (childBlueprint, childJSON) => key => {
  const childModel = model(childBlueprint, childJSON)().reduce(
    (acc, child, index) => {
      const id = child["id"] || index;

      acc.find = Object.assign(acc.find, { [id]: child });
      acc.ids = acc.ids.concat(id);

      return acc;
    },
    { find: {}, ids: [] }
  );

  return { [key]: childModel };
};
