import { isMetaFunction } from "./is-meta-function";
import { ValidationErrorCodes } from "./error-codes";
import { MetaCustomTypesValidation } from "./custom-types-validation";
import { error, success } from "./chalk-formatting";
import { propertyUniquenessCheck } from "./name-uniqueness-check";

/** Validates the string content of a `meta-function.json` file */
export const validateStringConfiguration = (configurationData : string) => {
  let objectResult;

  try {
    objectResult = JSON.parse(configurationData);
  } catch (e) {
    throw Error(error(ValidationErrorCodes.V00 + " - File content is not a valid JSON"))
  }

  isMetaFunction(objectResult);

  if (objectResult.customTypes !== undefined) {
    propertyUniquenessCheck(objectResult.customTypes, "name", "customTypes");
  }

  new MetaCustomTypesValidation(objectResult).execute();

  console.log(success("File passed validation."));
}
