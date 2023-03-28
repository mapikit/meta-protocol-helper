/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { MetaProtocol } from "../../../dist/index";

export class Test extends MetaProtocol {
  constructor (config, bopsManager) {
    super(config, bopsManager);
  }

  start () {}

  stop () {}

  getProtocolPublicMethods () {
    return {
      sum: ({ initialNumber }) => ({ sum: initialNumber + this.protocolConfiguration.sumNumber }),
    };
  }
}
