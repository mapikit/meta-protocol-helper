import { FunctionManager } from "meta-function-helper";
import { error } from "./chalk-formatting";
import { ValidationErrorCodes } from "./error-codes";
import { MetaProtocol } from "./meta-protocol";
import { BuiltMetaProtocolDefinition } from "./meta-protocol-type";
import { join } from "path"

const stubConfig = {};
const stubManager = {
  get: () => () => {},
}

export class ValidateMetaProtocolClass {
  public constructor (
    private readonly protocolDefinition : BuiltMetaProtocolDefinition,
    private readonly filePath : string = process.cwd(),
  ) {
    this.execute = this.execute.bind(this);
    this.importClass = this.importClass.bind(this);
    this.validatePackageMethods = this.validatePackageMethods.bind(this);
  }

  public async execute () : Promise<void> {
    const NewableProtocol = await this.importClass()
      .catch((err) => {
        console.error(err);
        throw Error(error(ValidationErrorCodes.V06P));
      });

    const instantiatedProtocol = new NewableProtocol(
      stubConfig, stubManager,
    );

    const requiredMethods = [
      "start", "stop", "validateConfiguration", "getProtocolPublicMethods"
    ]

    for (const method of requiredMethods) {
      if (instantiatedProtocol[method] === undefined) {
        throw Error(error(ValidationErrorCodes.V07P
          + ` - method "${method}" must be implemented`))
      }
    }

    this.validatePackageMethods(instantiatedProtocol as MetaProtocol<unknown>);
  }

  private async importClass<T>() : Promise<new (
    arg1 : unknown, arg2 : FunctionManager
  ) => T> {
    const entrypointPath = this.protocolDefinition.entrypoint;
    const path = join(this.filePath, entrypointPath);
    console.log(path)
    const importedAsset = import(path);

    const result = (await importedAsset)[this.protocolDefinition.className];

    if (result === undefined) {
      throw Error(error(ValidationErrorCodes.V11P) + `: "${this.protocolDefinition.className}" at "${path}"`)
    }

    return result;
  }

  private validatePackageMethods <T, Y extends MetaProtocol<T>>(instance: Y) : void {
    const publicMethods = instance.getProtocolPublicMethods();

    if (typeof publicMethods !== "object") {
      throw Error(error(ValidationErrorCodes.V10P))
    }

    const packageDetails = this.protocolDefinition.packageDetails;
    if (packageDetails === undefined) { return; }

    packageDetails.functionsDefinitions.forEach((functionDefinition) => {
      if (publicMethods[functionDefinition.functionName] === undefined) {
        throw Error(error(ValidationErrorCodes.V08P
          + ` - function "${functionDefinition.functionName}" must be present in the "getProtocolPublicMethods" result`))
      }
    });
  }
  
}