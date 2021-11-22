import { getDescriptorFileContent } from "@meta-system/meta-function-helper";
import { validateProtocolConfiguration } from "../validate-protocol-configuration";
import { processing } from "../chalk-formatting";

export const validateProtocol = async (workingDir = "") : Promise<void> => {
  console.log(processing("Starting validation of the \"meta-protocol.json\" file...\n"));

  const fileContent = await getDescriptorFileContent(workingDir, "meta-protocol.json");
  await validateProtocolConfiguration(fileContent, workingDir);
};
