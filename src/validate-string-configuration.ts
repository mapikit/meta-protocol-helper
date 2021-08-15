
import { ValidationErrorCodes } from "./error-codes";
import { error, success } from "./chalk-formatting";
import { isMetaProtocol } from "./is-meta-protocol";
import { ValidateMetaProtocolClass } from "./validate-meta-protocol-class";
import { buildFullPackageDescription } from "meta-function-helper/dist/src/build-full-package-description";
import { BuiltMetaProtocolDefinition } from "./meta-protocol-type";
import { isMetaFunction } from "meta-function-helper/dist/src/is-meta-function";
import { MetaFunction } from "meta-function-helper";

export type ExecConfig = {
  filePath ?: string
}

export const validateProtocolStringConfiguration = async (configurationData : string, config : ExecConfig = {}) => {
  let objectResult;

  try {
    objectResult = JSON.parse(configurationData);
  } catch (e) {
    throw Error(error(ValidationErrorCodes.V00P + " - File content is not a valid JSON"))
  }

  isMetaProtocol(objectResult);

  if (objectResult.packageDetails !== undefined) {
    if (!Array.isArray(objectResult.packageDetails.functionsDefinitions)) {
      throw Error(error(ValidationErrorCodes.V09P))
    }
    objectResult.packageDetails = await buildFullPackageDescription(objectResult.packageDetails);

    objectResult.packageDetails.functionsDefinitions.forEach((functionDef) => {
      isMetaFunction(functionDef as MetaFunction, true);
    })
  }

  await new ValidateMetaProtocolClass(
    objectResult as BuiltMetaProtocolDefinition,
    config.filePath
  ).execute();

  console.log(success("File passed validation."));
}
