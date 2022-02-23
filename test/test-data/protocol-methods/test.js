/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const imported = require("../../../dist/index");

class Test extends imported.MetaProtocol {
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

module.exports = {
  Test,
};
