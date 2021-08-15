import { ValidationErrorCodes } from "./src/error-codes";
import { validateProtocolStringConfiguration } from "./src/validate-string-configuration";
import { MetaProtocolDefinition, BuiltMetaProtocolDefinition } from "./src/meta-protocol-type";
import { isMetaProtocol } from "./src/is-meta-protocol";
import { ValidateMetaProtocolClass } from "./src/validate-meta-protocol-class";
import { MetaProtocol } from "./src/meta-protocol";

export {
  MetaProtocolDefinition,
  BuiltMetaProtocolDefinition,
}

export default {
  validateProtocolStringConfiguration,
  isMetaProtocol,
  ValidationErrorCodes,
  ValidateMetaProtocolClass,
  MetaProtocol
}

