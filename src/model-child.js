import { model, all } from "./model";
import { formatArrModel } from "./normalize";
/**
 * takes a schema blueprint and the path to the child being normalized
 *
 * returns a normalized data structure based on suggestions from the Redux documentation
 * https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
 *
 * e.g.
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
 * @param {} blueprint
 * @param {*} json
 */
export const modelChild = (blueprint, json, aggregates) => key => {
  const childModel = model(blueprint, json, aggregates)(all);
  return { [key]: childModel };
};
