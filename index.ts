import { ValidationErrorCodes } from "./src/error-codes";
import { validateProtocolConfiguration } from "./src/validate-protocol-configuration";
import { MetaProtocolDefinition, BuiltMetaProtocolDefinition } from "./src/meta-protocol-type";
import { isMetaProtocol } from "./src/is-meta-protocol";
import { ValidateMetaProtocolClass } from "./src/validate-meta-protocol-class";
import { MetaProtocol } from "./src/meta-protocol";

export {
  MetaProtocolDefinition,
  BuiltMetaProtocolDefinition,
}

export default {
  validateProtocolStringConfiguration: validateProtocolConfiguration,
  isMetaProtocol,
  ValidationErrorCodes,
  ValidateMetaProtocolClass,
  MetaProtocol
}

