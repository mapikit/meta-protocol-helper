import { ValidationErrorCodes } from "../error-codes";
import { error, highlight } from "../chalk-formatting";
import { ObjectDefinition, TypeDefinition } from "./object-definition-type";

export function isObjectDefinition (input : object) : asserts input is ObjectDefinition {
  if (typeof input !== "object" || Array.isArray(input)) {
    const logObject = typeof input === "object" ? JSON.stringify(input) : input 

    throw Error(error(ValidationErrorCodes.V29) + ` - "${logObject}"`);
  }

  const typeDefinitions = Object.values(input);

  typeDefinitions.forEach((typeDefinition) => {
    isTypeDefinition(typeDefinition);
  })
}

export function isTypeDefinition (input : object) : asserts input is TypeDefinition {
  if (typeof input !== "object" || Array.isArray(input)) {
    throw Error(error(ValidationErrorCodes.V30) + ` - ${input}`);
  }

  if (typeof input["type"] !== "string") {
    throw Error(error(ValidationErrorCodes.V31 + ` - ${input["type"]}`));
  }

  if (input["type"][0] !== "$") {
    const validNonReferencialTypes = [
      "object",
      "array",
      "string",
      "number",
      "boolean",
      "date",
      "any",
      "cloudedObject"
    ]

    if (!validNonReferencialTypes.includes(input["type"])) {
      throw Error(error(ValidationErrorCodes.V26) + ` - "${highlight(input["type"])}"`);
    }
  }

  if (input["required"] !== undefined && typeof input["required"] !== "boolean") {
    throw Error(error(ValidationErrorCodes.V32 + ` - ${input["requried"]}`));
  }

  const deepObjectTypes = ["object", "array"];
  if (deepObjectTypes.includes(input["type"])) {
    if (typeof input["subtype"] === "object") {
      return isObjectDefinition(input["subtype"]);
    }

    if (input["subtype"] === undefined) {
      throw Error(error(ValidationErrorCodes.V33) + ` - At "${JSON.stringify(input)}"`);
    }

    if (input["subtype"][0] !== "$") {
      const validNonReferencialTypes = [
        "string",
        "number",
        "boolean",
        "date",
        "any",
        "cloudedObject"
      ]

      if (!validNonReferencialTypes.includes(input["subtype"])) {
        throw Error(error(ValidationErrorCodes.V26) + ` - "${highlight(input["subtype"])}"`);
      }
    }
  }
}