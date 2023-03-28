
import { ValidationErrorCodes } from "./error-codes.js";
import { error, success } from "./chalk-formatting.js";
import { isMetaProtocol } from "./is-meta-protocol.js";
import { BuiltMetaProtocolDefinition } from "./type/meta-protocol-type.js";
import { buildAllFunctionDefinitions, isFunctionDefinition } from "@meta-system/meta-function-helper";
import { ValidateProtocolClass } from "./validate-protocol-class.js";
import Path from "path"; // TODO RUNTIME IMPORT
import { readFileSync } from "fs";

// eslint-disable-next-line max-lines-per-function
export const validateProtocolConfiguration = async (
  configurationData : unknown, workingDir = "", isDbProtocol = false) : Promise<void> => {
  isMetaProtocol(configurationData);

  let packageJson = null;
  try {
    const packageText = readFileSync(`${Path.resolve(workingDir, "package.json")}`).toString();
    packageJson = JSON.parse(packageText);
  } catch {
    console.log("No package.json file found - this might be a test package, or the package is misconfigured."
      + ` In both cases, this package should not be used in production environment (from "${configurationData.protocolName}").`
    )
  }

  const builtProtocol : BuiltMetaProtocolDefinition = {
    ...configurationData,
    version: configurationData.version ?? (packageJson && packageJson["version"]),
    functionDefinitions: [],
  };

  if (!builtProtocol.version) {
    throw Error(error(ValidationErrorCodes.V03P + " - Version was not found in neither \"package.json\" or the configuration file."));
  }

  if(packageJson && builtProtocol.version !== packageJson["version"]) throw Error(error(ValidationErrorCodes.V12P));

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
