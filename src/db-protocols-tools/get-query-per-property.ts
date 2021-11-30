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
    result[pathWithoutOperation] = value;
  }

  return result;
};

// eslint-disable-next-line max-lines-per-function
const getQueryPaths = (object : Record<string, unknown>) : string[] => {
  const result = [];
  let currentIndex = 0;

  for (const key in object) {
    result.push(key);
    currentIndex = result.length -1;
    const value = object[key];
    if (typeof value === "object" && !Array.isArray(value)) {
      isRecord(value);
      const innerObj = getQueryPaths(value);
      innerObj.forEach((innerPath, index) => {
        const basePath = result[currentIndex];
        result[currentIndex + index] = `${basePath}.${innerPath}`;
      });
    }
  }

  return result;
};

function isRecord (input : unknown) : asserts input is Record<string, unknown> {
  if (typeof input === "object" && !Array.isArray(input)) {
    return;
  }

  throw Error("not Valid record");
};
