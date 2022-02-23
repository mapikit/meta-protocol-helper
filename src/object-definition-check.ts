import { isObjectDefinition } from "@meta-system/object-definition";

export const checkValidObjectDefinition = (input : object) : void => {
  let error = "";
  try {
    isObjectDefinition(input);
  } catch (err) {
    error = `Protocol configuration type validation failed: ${err}`;
    throw Error(error);
  }
};
