import { FunctionManager } from "@meta-system/meta-function-helper";

export abstract class MetaProtocol<ProtocolConfig> {
  public constructor (
    protected protocolConfiguration : ProtocolConfig,
    protected bopsManager : FunctionManager,
  ) {
    this.protocolConfiguration = Object.freeze(protocolConfiguration);
  }

  public abstract validateConfiguration () : void;
  public abstract start () : void;
  public abstract stop () : void;
  public abstract getProtocolPublicMethods () : Record<string, Function>;
}
