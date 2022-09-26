import { getObjectProperty } from "./get-object-property";
import { QueryOperation, QueryType } from "../type/db-protocol-types";

// { path: rule }
type QueryPerPath = {
  [path : string] : QueryOperation;
}

export const getQueryPerProperty = (query : QueryType) : QueryPerPath => {
  const result : QueryPerPath = {};

  const paths = getQueryPaths(query);

  for (const path of paths) {
    const property = getObjectProperty(query, path);
    const operation = path.slice(path.lastIndexOf(".") + 1);
    const pathWithoutOperation = path.slice(0, path.lastIndexOf("."));

    const value = {};
    value[operation] = property;
    if (result[pathWithoutOperation] === undefined) result[pathWithoutOperation] = {};
    Object.assign(result[pathWithoutOperation], value);
  }

  return result;
};

// eslint-disable-next-line max-lines-per-function
const getQueryPaths = (object : Record<string, unknown>) : string[] => {
  const result = [];
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length > 0) {
      isRecord(value);
      const innerObj = getQueryPaths(value);
      innerObj.forEach((innerPath) => {
        result.push(`${key}.${innerPath}`);
      });

      return;
    }

    result.push(key);
  });

  return result;
};

function isRecord (input : unknown) : asserts input is Record<string, unknown> {
  if (typeof input === "object" && !Array.isArray(input)) {
    return;
  }

  throw Error("not Valid record");
};
