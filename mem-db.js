const imported = require("./dist/index.js");

class MemDb extends imported.DBProtocol {
  constructor () {
    super()
  }

  validateConfiguration() {};
  initialize() {};
  shutdown() {};
  getProtocolPublicMethods() {
    return {}
  }

  insert() {};
  findById() {};
  find() {};
  update() {};
  updateById() {};
  delete() {};
  deleteById() {};
}

module.exports = { MemDb }
