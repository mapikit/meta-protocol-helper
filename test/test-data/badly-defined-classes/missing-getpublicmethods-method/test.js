/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { MetaProtocol } from "../../../../dist/index";

export class Test extends MetaProtocol {
  constructor () {
    super();
  }

  start () {}

  stop () {}

  validateConfiguration () {}

  // getProtocolPublicMethods () {
  //   return {
  //     aNamedFunction: () => {},
  //   };
  // }
}
