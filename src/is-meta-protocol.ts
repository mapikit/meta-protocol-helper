import { valid } from "semver";
import { error } from "./chalk-formatting";
import { ValidationErrorCodes } from "./error-codes";
import { MetaProtocolDefinition } from "./meta-protocol-type";

export function isMetaProtocol (input : object) : asserts input is MetaProtocolDefinition {
  const protocolLikeInput = input as MetaProtocolDefinition;

  if (typeof protocolLikeInput.protocolName !== "string") {
    throw Error(error(ValidationErrorCodes.V01P));
  }

  if (typeof protocolLikeInput.description !== "string") {
    throw Error(error(ValidationErrorCodes.V02P));
  }

  if (valid(protocolLikeInput.version) === null) {
    throw Error(error(ValidationErrorCodes.V03P));
  }

  if (typeof protocolLikeInput.entrypoint !== "string") {
    throw Error(error(ValidationErrorCodes.V04P));
  }

  if (typeof protocolLikeInput.className !== "string") {
    throw Error(error(ValidationErrorCodes.V05P));
  }
}
