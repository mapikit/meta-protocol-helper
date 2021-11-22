
import { ValidationErrorCodes } from "./error-codes";
import { error, success } from "./chalk-formatting";
import { isMetaProtocol } from "./is-meta-protocol";
import { ValidateMetaProtocolClass } from "./validate-meta-protocol-class";
import { BuiltMetaProtocolDefinition } from "./meta-protocol-type";
import { buildAllFunctionDefinitions, isFunctionDefinition } from "@meta-system/meta-function-helper";

// eslint-disable-next-line max-lines-per-function
export const validateProtocolConfiguration = async (configurationData : unknown, workingDir = "") : Promise<void> => {
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

  await new ValidateMetaProtocolClass(
    builtProtocol,
    workingDir,
  ).execute();

  console.log(success("File passed validation."));
};
