import { error, highlight } from "./chalk-formatting";
import { ValidationErrorCodes } from "./error-codes";

/**
 * Checks if all provided Elements have a unique property
 */
export const propertyUniquenessCheck =
 <T extends object>(namedElementList : T[], propertyName : keyof T, entityName : string) => {
  const nameList = [];

  namedElementList.forEach((namedElement) => {
    if (nameList.includes(namedElement[propertyName])) {
      throw Error(error(ValidationErrorCodes.V27) +
        `- "${entityName}" - ${highlight(`"${namedElement[propertyName]}"`)}`);
    }

    nameList.push(namedElement[propertyName]);
  })
}
