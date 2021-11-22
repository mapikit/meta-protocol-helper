#!/usr/bin/env node
import { validateProtocol } from "./validate-protocol";

const main = async () : Promise<void> => {
  await validateProtocol();
};

main().catch((error) => {
  console.log("Could not pass file validation due to error below:");
  console.log(error.message);
  console.error(error);

  process.exit(1);
});;
