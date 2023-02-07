
import { ValidationErrorCodes } from "./error-codes";
import { error, success } from "./chalk-formatting";
import { isMetaProtocol } from "./is-meta-protocol";
import { BuiltMetaProtocolDefinition } from "./type/meta-protocol-type";
import { buildAllFunctionDefinitions, isFunctionDefinition } from "@meta-system/meta-function-helper";
import { ValidateProtocolClass } from "./validate-protocol-class";
import Path from "path";
import { readFileSync } from "fs";

// eslint-disable-next-line max-lines-per-function
export const validateProtocolConfiguration = async (
  configurationData : unknown, workingDir = "", isDbProtocol = false) : Promise<void> => {
  isMetaProtocol(configurationData);

  const packageText = readFileSync(`${Path.resolve(workingDir, "package.json")}`).toString();
  const packageJson = JSON.parse(packageText);

  const builtProtocol : BuiltMetaProtocolDefinition = {
    ...configurationData,
    version: configurationData.version ?? packageJson["version"],
    functionDefinitions: [],
  };

  if(builtProtocol.version !== packageJson["version"]) throw Error(error(ValidationErrorCodes.V12P));

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
