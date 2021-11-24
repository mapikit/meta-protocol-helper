/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const imported = require("../../../../dist/index");

class TestDBProtocol extends imported.DBProtocol {
  constructor () {
    super();
  }

  initialize () {}

  shutdown () {}

  validateConfiguration () {}

  getProtocolPublicMethods () {
    return {
      aNamedFunction: () => {},
    };
  }

  insert () {}
  deleteById () {}
  updateById () {}
  update () {}
  delete () {}
  findById () {}
  find () {}
  count () {}
}

module.exports = {
  TestDBProtocol,
};
