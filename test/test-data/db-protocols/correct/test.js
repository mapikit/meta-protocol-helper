/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { DBProtocol } from "../../../../dist/index";

export class TestDBProtocol extends DBProtocol {
  constructor () {
    super();
  }

  initialize () {}

  shutdown () {}

  validateConfiguration () {}

  verifySchemaSupport () {}

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
