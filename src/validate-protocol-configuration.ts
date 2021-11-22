
import { ValidationErrorCodes } from "./error-codes";
import { error, success } from "./chalk-formatting";
import { isMetaProtocol } from "./is-meta-protocol";
import { BuiltMetaProtocolDefinition } from "./meta-protocol-type";
import { buildAllFunctionDefinitions, isFunctionDefinition } from "@meta-system/meta-function-helper";
import { ValidateProtocolClass } from "./validate-protocol-class";

// eslint-disable-next-line max-lines-per-function
export const validateProtocolConfiguration = async (
  configurationData : unknown, workingDir = "", isDbProtocol = false) : Promise<void> => {
  isMetaProtocol(configurationData);

  const builtProtocol : BuiltMetaProtocolDefinition = {
    ...configurationData,
    functionDefinitions: [],
  };

  if (configurationData.functionDefinitions !== undefined) {
    if (!Array.isArray(configurationData.functionDefinitions)) {
      throw Error(error(ValidationErrorCodes.V09P));
    }

    builtProtocol.functionDefinitions = await buildAllFunctionDefinitions(
      configurationData.functionDefinitions, workingDir);

    configurationData.functionDefinitions.forEach((functionDef) => {
      isFunctionDefinition(functionDef);
    });
  }

  await new ValidateProtocolClass(
    builtProtocol,
    workingDir,
    isDbProtocol,
  ).execute();

  console.log(success("File passed validation."));
};
