import { checkValidObjectDefinition } from "./object-definition-check";
import { valid } from "semver";
import { error } from "./chalk-formatting";
import { ValidationErrorCodes } from "./error-codes";
import { MetaProtocolDefinition } from "./type/meta-protocol-type";

// eslint-disable-next-line max-lines-per-function
export function isMetaProtocol (input : unknown) : asserts input is MetaProtocolDefinition {
  if (typeof input !== "object") {
    throw Error(error(ValidationErrorCodes.ValidatedProtocolNotObject));
  }

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

  checkValidObjectDefinition(protocolLikeInput.configurationFormat);
}
