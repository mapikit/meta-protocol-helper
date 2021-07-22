import { error, highlight } from "./chalk-formatting";
import { ValidationErrorCodes } from "./error-codes";
import { CustomType, MetaFunction } from "./meta-function-type";
import { getAllTypesInDefinition } from "./object-definition/get-all-types-in-definition";
import { ObjectDefinition } from "./object-definition/object-definition-type";

/**
 * Class to validate the rules of the schema of a Meta Function json configuration.
 */
export class MetaCustomTypesValidation {
  private customTypesNames : string[] = [];
  private metaFunctionData : MetaFunction;

  public constructor (metaFunctionData : MetaFunction) {
    metaFunctionData.customTypes?.forEach((customType) => {
      this.customTypesNames.push("$" + customType.name);
    });

    this.metaFunctionData = metaFunctionData;
  }

  public execute () : void {
    this.metaFunctionData.customTypes?.forEach((customTypeDefinition) => {
      this.checkCustomTypeLinearity(customTypeDefinition, []);
      this.checkObjectType(customTypeDefinition.type)
    });

    if (this.metaFunctionData.inputParameters !== undefined) {
      this.checkObjectType(this.metaFunctionData.inputParameters)
    }

    this.checkObjectType(this.metaFunctionData.outputData)
  }

  private checkObjectType = (input : ObjectDefinition) => {
    const typesList = Object.values(input)
      .map((typeDefinition) => typeDefinition.type)

    typesList.forEach((type) => {
      if (this.isCustomType(type)) {
        return this.validateCustomType(type);
      }
    })
  };

  private isCustomType (input : string) : boolean {
    return input[0] === "$";
  }

  private validateCustomType (input : string) : void {
    if (!this.customTypesNames.includes(input)) {
      throw Error(error(ValidationErrorCodes.V24) + ` - "${highlight(input)}"`);
    }
  }

  /** Checks if there is no loop reference on the given custom type */
  private checkCustomTypeLinearity (typeToValidate : CustomType, currentReferenceChain : string[] = []) : void {
    const referenceChain = currentReferenceChain;

    if (referenceChain.includes(typeToValidate.name)) {
      throw Error(ValidationErrorCodes.V25);
    }

    referenceChain.push(typeToValidate.name);

    const types = getAllTypesInDefinition(typeToValidate.type)
    
    const customObjectTypes = types.filter((propertyDeclaration) => propertyDeclaration[0] === "$")

    customObjectTypes.forEach((type) => {
      if (type[0] === "$") {
        this.validateCustomType(type);

        const referencedCustomType = this.metaFunctionData.customTypes.find((typeDefinition) =>
          typeDefinition.name === type.substring(1));

        return this.checkCustomTypeLinearity(referencedCustomType, referenceChain);
      }
    });
  }
}
