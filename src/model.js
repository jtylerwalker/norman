import { normalize } from "./normalize";

/**
 *
 * Returns a modelled curry function based on json and blueprint schema
 * on the second invocation it accepts one of the grouping functions and params
 * if the grouping function requires them
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
 * @param {*} blueprint
 * @param {*} json
 */
export const model = (blueprint, json, aggregates) => (func, ...params) =>
  func
    ? func(normalize(json, blueprint, aggregates), ...params)
    : all(normalize(json, blueprint, aggregates));

/**
 *
 * takes a schema blueprint and the path to the child being normalized
 *
 * @param {} blueprint
 * @param {*} json
 */
export const modelChild = (blueprint, json, aggregates) => key => {
  const childModel = model(blueprint, json, aggregates)(all);
  return { [key]: childModel };
};

/**
 *
 * Returns all modeled entities
 *
 * @param {*} entities
 */
export const all = entities => entities;
/**
 *
 * Returns first entry of array
 *
 * @param {*} entities
 */
export const first = entities => entities.find[entities.ids[0]];

/**
 *
 * returns last entry of array
 *
 * @param {*} entities
 */
export const last = entities =>
  entities.find[entities.ids[entities.ids.length - 1]];

/**
 *
 * returns the nth entry of array
 * nth is the array index number, to make things cohesive
 *
 * @param {} entities
 * @param {*} nth
 */
export const nth = (entities, nth) => entities.find[entities.ids[nth]];

/**
 *
 * curried function that returns filtered array
 *
 * @param {*} entities
 * @param {*} param
 * @param {*} val
 */
export const findBy = (entities, query) => func => {
  let sortedEntities = sortBy(entities, "userId")(all);

  entities.ids = sortedEntities.ids.reduce((acc, id) => {
    Object.entries(entities.find[id]).forEach(([eKey, eValue]) => {
      let matches = true;
      Object.entries(query).forEach(([key, value]) => {
        matches = key === eKey && value === eValue;
      });
      if (matches) {
        acc = acc.concat(id);
      }
    });

    return acc;
  }, []);

  return func(entities);
};

/**
 *
 * wraps sort method to return sorted entities
 *
 * @param {*} entities
 * @param {*} param
 */
export const sortBy = (entities, param) => func => {
  entities.ids = entities.ids.sort(
    (a, b) =>
      (entities.find[a][param] < entities.find[b][param] && -1) ||
      (entities.find[a][param] > entities.find[b][param] && 1) ||
      0
  );
  return func(entities);
};

/**
 *
 * returns new entitiesarray after removing entry based on params
 *
 * @param {*} entities
 * @param {*} param
 * @param {*} val
 */
export const remove = (entities, removalId) => func => {
  entities.ids = entities.ids.filter(id => removalId !== id);

  return func(entities);
};

// strip give a smaller more manageable object
