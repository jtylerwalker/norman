import { model } from "./model";

/**
 * takes a blueprint and the path to the child being normalized
 *
 * returns a normalized data structure based on sugge4stions from the Redux documentation
 * https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
 *
 * e.g.
 *
 * {
 *     "id": 42,
 *     "name": "Pikachu",
 *     "stats": [
 *         {
 *           "id": "100",
 *           "strength": 40,
 *         },
 *         {
 *           "id": "101",
 *           "cuteness": 95,
 *         },
 *         {
 *           "id": "102",
 *           "agility": 85,
 *         },
 *     ]
 * }
 * becomes::
 * {
 *     id: 42,
 *     name: "Pikachu",
 *     stats: {
 *         find: {
 *             "100": {
 *                 id: "100",
 *                 strength: 40
 *             },
 *            "101": {
 *                 id: "101",
 *                 cuteness: 95,
 *            },
 *            "102": {
 *                 id: "102",
 *                 agility: 85,
 *            },
 *        }
 *        ids: ["100", "101", "102"]
 *     }
 * }
 *
 *
 *
 * @param {} childBlueprint
 * @param {*} childJSON
 */
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
