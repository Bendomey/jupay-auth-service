import lodash from "lodash";

export const createFindOneCollection =
  ({ models }) =>
  ({ collection, query }) =>
    models[collection].findOne(query);

export const createFindByIdCollection =
  ({ models }) =>
  ({ collection, query }) =>
    models[collection].findById(query);

export const createNewCollection =
  ({ models }) =>
  ({ collection, query }) =>
    new models[collection](query);

export const createUpdateOneCollection =
  () =>
  ({ model, query, updates }) =>
    model.updateOne({ ...query }, { ...updates }, { runValidators: true });

export const createGetDocumentsFromCollection =
  ({ models }) =>
  ({
    collection,
    pagination = {},
    orderBy = "createdAt",
    order = "descending",
    filter = {},
    search, // search parameters
    dateRange,
    dateField = "createdAt",
  }) =>
    new Promise(async function (resolve, reject) {
      if (search) {
        filter["$or"] = lodash.map(search.searchFields, function (field) {
          return {
            [field]: new RegExp(search.criteria, "i"),
          };
        });
      }
      if (dateRange) {
        filter[dateField] = {
          $gte: new Date(new Date(dateRange.startTime).setHours(0, 0, 0, 0)),
          $lte: new Date(new Date(dateRange.endTime).setHours(23, 59, 59, 999)),
        };
      }
      await models[collection]
        .find(filter)
        .sort({ [orderBy]: order })
        .skip(pagination.skip)
        .limit(pagination.limit)
        .then(resolve)
        .catch(reject);
    });

export const createCountDocumentsFromCollection =
  ({ models }) =>
  ({
    collection,
    filter = {},
    search, // search parameters
    dateRange,
    dateField = "createdAt",
  }) =>
    new Promise(async function (resolve, reject) {
      if (search) {
        filter["$or"] = lodash.map(search.searchFields, function (field) {
          return {
            [field]: new RegExp(search.criteria, "i"),
          };
        });
      }
      if (dateRange) {
        filter[dateField] = {
          $gte: new Date(new Date(dateRange.startTime).setHours(0, 0, 0, 0)),
          $lte: new Date(new Date(dateRange.endTime).setHours(23, 59, 59, 999)),
        };
      }
      await models[collection]
        .countDocuments(filter)
        .then(resolve)
        .catch(reject);
    });
