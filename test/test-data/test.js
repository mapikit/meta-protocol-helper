/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const imported = require("../../dist/index");

class Test extends imported.MetaProtocol {
  constructor () {
    super();
  }

  start () {}

  stop () {}

  validateConfiguration () {}

  getProtocolPublicMethods () {
    return {
      aNamedFunction: () => {},
    };
  }
}

module.exports = {
  Test,
};
