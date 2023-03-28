#!/usr/bin/env node
import { validateProtocol } from "./validate-protocol.js";

const main = async () : Promise<void> => {
  await validateProtocol("", true);
};

main().catch((error) => {
  console.log("Could not pass file validation due to error below:");
  console.log(error.message);
  console.error(error);

  process.exit(1);
});;
