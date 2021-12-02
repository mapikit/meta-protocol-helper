import { error } from "./chalk-formatting";
import { ValidationErrorCodes } from "./error-codes";
import { MetaProtocol } from "./meta-protocol";
import { BuiltMetaProtocolDefinition } from "./type/meta-protocol-type";
import { getClassConstructor } from "@meta-system/meta-function-helper";

const stubConfig = {};
const stubManager = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  get: () => () : void  => {},
};

export class ValidateProtocolClass {
  public constructor (
    private readonly protocolDefinition : BuiltMetaProtocolDefinition,
    private readonly filePath : string = "",
    private readonly isDbProtocol = false,
  ) {
    this.execute = this.execute.bind(this);
    this.validatePackageMethods = this.validatePackageMethods.bind(this);
  }

  // eslint-disable-next-line max-lines-per-function
  public async execute () : Promise<void> {
    const NewableProtocol = await getClassConstructor(
      this.filePath,
      this.protocolDefinition.entrypoint,
      this.protocolDefinition.className)
      .catch((err) => {
        console.error(err);
        throw Error(error(ValidationErrorCodes.V06P));
      }) as new (...args) => unknown;

    if (NewableProtocol === undefined) {
      throw Error(error(ValidationErrorCodes.V06P));
    }

    const secondArg = this.isDbProtocol ? [] : stubManager;

    const instantiatedProtocol = new NewableProtocol(
      stubConfig, secondArg,
    );

    for (const method of this.getRequiredMethods()) {
      if (instantiatedProtocol[method] === undefined) {
        throw Error(error(ValidationErrorCodes.V07P
          + ` - method "${method}" must be implemented`));
      }
    }

    this.validatePackageMethods(instantiatedProtocol as MetaProtocol<unknown>);
  }

  private validatePackageMethods <T, Y extends MetaProtocol<T>> (instance : Y) : void {
    const publicMethods = instance.getProtocolPublicMethods();

    if (typeof publicMethods !== "object") {
      throw Error(error(ValidationErrorCodes.V10P));
    }

    const packageDetails = this.protocolDefinition.functionDefinitions;
    if (packageDetails === undefined) { return; }

    packageDetails.forEach((functionDefinition) => {
      if (publicMethods[functionDefinition.functionName] === undefined) {
        throw Error(error(ValidationErrorCodes.V08P
          + ` - function "${functionDefinition.functionName}" must be present`
          + " in the \"getProtocolPublicMethods\" result"));
      }
    });
  }

  // eslint-disable-next-line max-lines-per-function
  private getRequiredMethods () : string[] {
    const baseRequiredMethods = [ "validateConfiguration", "getProtocolPublicMethods" ];

    if (this.isDbProtocol) {
      return [
        "verifySchemaSupport",
        "initialize",
        "shutdown",
        "insert",
        "deleteById",
        "updateById",
        "update",
        "delete",
        "findById",
        "find",
        "count",
        ...baseRequiredMethods,
      ];
    }

    return [ "start", "stop", ...baseRequiredMethods ];
  }
};
