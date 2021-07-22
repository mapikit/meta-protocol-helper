import SemVer from "semver";
import { error } from "./chalk-formatting";
import { ValidationErrorCodes } from "./error-codes";
import { CustomType, MetaFunction } from "./meta-function-type";
import { isObjectDefinition } from "./object-definition/is-object-definition";

/**
 * Validates if input is a string with length > 0
 */
const isValidString = (input : unknown, errorCode : ValidationErrorCodes) => {
  if (typeof input !== "string") {
    throw Error(error(errorCode));
  }

  if (input.length <= 0) {
    throw Error(error(errorCode));
  }
};

/**
 * Validates if the object input is a valid Meta-Function declaration object
 * 
 * This does not validates the rules of the object data, such as the validity of all types
 */
export function isMetaFunction (input : object) : asserts input is MetaFunction {
  const metaFunctionLikeInput = input as MetaFunction;

  if (metaFunctionLikeInput.author !== undefined) {
    isValidString(metaFunctionLikeInput.author, ValidationErrorCodes.V01);
  }

  if (SemVer.valid(metaFunctionLikeInput.version) === null) {
    throw Error(error(ValidationErrorCodes.V02));
  }

  isValidString(metaFunctionLikeInput.description, ValidationErrorCodes.V03);
  isValidString(metaFunctionLikeInput.entrypoint, ValidationErrorCodes.V04);
  isValidString(metaFunctionLikeInput.mainFunction, ValidationErrorCodes.V05);

  if (metaFunctionLikeInput.customTypes !== undefined && !Array.isArray(metaFunctionLikeInput.customTypes)) {
    throw Error(error(ValidationErrorCodes.V06));
  }


  isCustomType(metaFunctionLikeInput.customTypes);

  if (metaFunctionLikeInput.inputParameters !== undefined) {
    isObjectDefinition(metaFunctionLikeInput.inputParameters);
  }

  if (metaFunctionLikeInput.outputData !== undefined) {
    isObjectDefinition(metaFunctionLikeInput.outputData);
  }
}

function isCustomType (input ?: unknown[]) : asserts input is CustomType[] {
  if (input === undefined) return;

  input.forEach((inputElement) => {
    const customTypeInput = inputElement as CustomType;

    isValidString(customTypeInput.name, ValidationErrorCodes.V10);
    isObjectDefinition(customTypeInput.type);
  })
}
