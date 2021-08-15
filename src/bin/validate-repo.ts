#!/usr/bin/env node

import { findMetaFunctionFile } from "../find-function-declaration-file";
import { processing } from "../chalk-formatting";
import { validateProtocolStringConfiguration } from "../validate-string-configuration";

const main = () : void => {
  console.log(processing("Starting validation of the \"meta-protocol.json\" file...\n"))
  findMetaFunctionFile()
    .then(validateProtocolStringConfiguration)
    .catch((error) => {
      console.log("Could not pass file validation due to error below:");
      console.log(error.message);
      console.error(error)

      process.exit(1);
    });
}

main();
