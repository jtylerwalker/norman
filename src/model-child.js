import { model, all } from "./model";
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
  const defaultAcc = _buildAcc(aggregates);
  const childModel = model(blueprint, json)(all).reduce((acc, child, index) => {
    const id = child["id"] || index;

    aggregates &&
      Object.keys(aggregates).map(key => {
        console.warn(aggregates[key](json[index]));
        acc[key] = acc[key].concat(aggregates[key](json[index]));
      });

    return _setAccValues(acc, id, child);
  }, defaultAcc);

  return { [key]: childModel };
};

const _setAccValues = (acc, id, child) => {
  acc.find = Object.assign(acc.find, { [id]: child });
  acc.ids = acc.ids.concat(id);

  return acc;
};

const _buildAcc = aggregates => {
  let defaultAcc = { find: {}, ids: [] };

  aggregates &&
    Object.keys(aggregates).map(
      key => (defaultAcc = Object.assign({}, defaultAcc, { [key]: [] }))
    );

  return defaultAcc;
};
