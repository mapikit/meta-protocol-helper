import { BuiltMetaPackage, MetaPackage } from "meta-function-helper";

export interface MetaProtocolDefinition {
  protocolName : string;
  description : string;
  author ?: string;
  version : string; // Must be SemVer
  entrypoint : string;
  className : string;
  packageDetails ?: MetaPackage
}

export interface BuiltMetaProtocolDefinition {
  protocolName : string;
  description : string;
  author ?: string;
  version : string; // Must be SemVer
  entrypoint : string;
  className : string;
  packageDetails ?: BuiltMetaPackage
}