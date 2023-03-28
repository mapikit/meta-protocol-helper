import { getDescriptorFileContent } from "@meta-system/meta-function-helper";
import { validateProtocolConfiguration } from "../validate-protocol-configuration.js";
import { processing } from "../chalk-formatting.js";

export const validateProtocol = async (workingDir = "", isDbProtocol = false) : Promise<void> => {
  console.log(processing("Starting validation of the \"meta-protocol.json\" file...\n"));

  const fileContent = await getDescriptorFileContent(workingDir, "meta-protocol.json");

  await validateProtocolConfiguration(fileContent, workingDir, isDbProtocol);
};
