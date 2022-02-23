import { FunctionManager } from "@meta-system/meta-function-helper";
import { ObjectDefinition, validateObject } from "@meta-system/object-definition";

export abstract class MetaProtocol<ProtocolConfig> {
  public constructor (
    protected protocolConfiguration : ProtocolConfig,
    protected bopsManager : FunctionManager,
  ) {
    this.protocolConfiguration = Object.freeze(protocolConfiguration);
  }

  public validateConfiguration (configurationSchema : ObjectDefinition) : void {
    const result = validateObject(this.protocolConfiguration, configurationSchema);

    if (result.errors.length >= 1) {
      console.log("[ FATAL ] Errors encountered during protocol configuration validation:");
      result.errors.forEach((error) => {
        console.log(error);
      });

      console.log("Due to these errors, the system will not boot.");
      throw "Failed configuration check for Protocol!";
    }
  }

  public abstract start () : void;
  public abstract stop () : void;
  public abstract getProtocolPublicMethods () : Record<string, Function>;
}
