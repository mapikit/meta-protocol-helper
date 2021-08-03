export interface FunctionManager {
  get (functionName : string) : Function;
}

export abstract class MetaProtocol<ProtocolConfig> {
  public constructor (
    protected protocolConfiguration : ProtocolConfig,
    protected functionManager : FunctionManager,
  ) {
    this.protocolConfiguration = Object.freeze(protocolConfiguration);
  }

  public abstract validateConfiguration () : void;
  public abstract start () : void;
  public abstract stop () : void;
}