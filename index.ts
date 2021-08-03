import { isMetaFunction } from "./src/is-meta-function";
import { ValidationErrorCodes } from "./src/error-codes";
import { MetaCustomTypesValidation } from "./src/custom-types-validation";
import { validateStringConfiguration } from "./src/validate-string-configuration";
import { MetaProtocol, CustomType } from "./src/meta-protocol-type";
import { AcceptedTypes } from "./src/object-definition/object-definition-type";
import { isObjectDefinition } from "./src/object-definition/is-object-definition";

export {
  AcceptedTypes,
  MetaProtocol as MetaFunction,
  CustomType,
}

export default {
  validateStringConfiguration,
  MetaCustomTypesValidation,
  isMetaFunction,
  ValidationErrorCodes,
  isObjectDefinition
}

