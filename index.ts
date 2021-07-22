import { isMetaFunction } from "./src/is-meta-function";
import { ValidationErrorCodes } from "./src/error-codes";
import { MetaCustomTypesValidation } from "./src/custom-types-validation";
import { validateStringConfiguration } from "./src/validate-string-configuration";
import { MetaFunction, CustomType } from "./src/meta-function-type";
import { AcceptedTypes, ObjectDefinition } from "./src/object-definition/object-definition-type";
import { isObjectDefinition } from "./src/object-definition/is-object-definition";

export {
  AcceptedTypes,
  MetaFunction,
  CustomType,
  ObjectDefinition,
}

export default {
  validateStringConfiguration,
  MetaCustomTypesValidation,
  isMetaFunction,
  ValidationErrorCodes,
  isObjectDefinition
}

